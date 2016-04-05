<?php

namespace App\Http\Controllers\Student\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
// Requests
use Illuminate\Http\Request;
use App\Http\Requests\Student\Auth\SignupRequest;
use App\Http\Requests\Student\Auth\SigninRequest;
use App\Http\Requests\Student\Auth\ResendConfirmationEmailRequest;
// Models
use \App\Models\Student\Student;
//Exceptions
use App\Exceptions\ApiException;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $guard = 'students';

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * show signin form
     */
    public function showSigninForm()
    {
        return view('student.signin');
    }

    /**
     * Create a new user
     */
    protected function signup(SignupRequest $request)
    {
        $student = new Student;

        $token = sha1(uniqid(mt_rand(), true));

        $student->create([
            'family_name' => $request->family_name,
            'given_name'  => $request->given_name,
            'email'       => $request->email,
            'password'    => bcrypt($request->password),
            'api_token'   => $token,
            'confirmation_code' => md5(uniqid(mt_rand(), true)),
            'confirmed'   => config('access.users.confirm_email') ? 0 : 1,
            'status'      => 1,
        ]);

        return \Response::json($token, 200);
    }

    /**
     * Get api_token from email and password
     */
    protected function signin(SigninRequest $request)
    {
        if (!\Auth::guard('students')->once($request->all())) {
            throw new ApiException('student.notFound');
        }

        $token = \Auth::guard('students')->user()->api_token;

        return \Response::json($token, 200);
    }

    public function findByEmail($email) {
        $student = Student::where('email', $email)->first();

        if (!$student instanceof Student) {
            throw new ApiException('email.not_found');
        }

        return $student;
    }

    public function findByToken($token) {
        $student = Student::where('confirmation_code', $token)->first();

        if (!$student instanceof Student) {
            throw new ApiException('confirmation.not_found');
        }

        return $student;
    }

    public function confirmAccount($token)
    {
        $student = $this->findByToken($token);

        if ($student->confirmed == 1) {
            throw new ApiException('confirmation.already_confirmed');
        }

        if ($student->confirmation_code != $token) {
            throw new ApiException('confirmation.mismatch');
        }

        $student->confirmed = 1;
        $student->save();

        return \Response::json('confirmation.success', 200);
    }

    public function sendConfirmationEmail($user)
    {
        if (!$user instanceof User) {
            $user = $this->find($user);
        }

        return Mail::send('frontend.auth.emails.confirm', ['token' => $user->confirmation_code], function ($message) use ($user) {
            $message->to($user->email, $user->name)->subject(app_name() . ': ' . trans('exceptions.frontend.auth.confirmation.confirm'));
        });
    }

    public function resendConfirmationEmail(ResendConfirmationEmailRequest $email) {
        return $this->sendConfirmationEmail($this->findByEmail($email));
    }

}
