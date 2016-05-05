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
use App\Http\Requests\Student\Auth\CheckApitokenRequest;
// Models
use \App\Models\Student\Student;
// Exceptions
use App\Exceptions\ApiException;
// Jobs
use App\Jobs\Student\SendSignUpSucceedEmail;

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
    public function signup(SignupRequest $request)
    {
        $student = Student::where('email', $request->email)->first();

        if ($student instanceof Student) {
            throw new ApiException('email.already_exist');
        }

        $student = new Student;

        $token = sha1(uniqid(mt_rand(), true));

        $student->family_name = $request->family_name;
        $student->given_name = $request->given_name;
        $student->email = $request->email;
        $student->password = bcrypt($request->password);
        $student->api_token = $token;
        $student->confirmation_code = md5(uniqid(mt_rand(), true));
        $student->confirmed = config('access.users.confirm_email') ? 0 : 1;
        $student->status = 1;
        $student->save();

        // Queue jobを使ってメール送信
        $this->dispatch(new SendSignUpSucceedEmail($student));

        return \Response::json(['api_token' => $token], 200);
    }

    /**
     * Get api_token from email and password
     */
    public function signin(SigninRequest $request)
    {
        if (!\Auth::guard('students')->once($request->all())) {
            throw new ApiException('student.not_found');
        }

        $student = \Auth::guard('students')->user();

        $student->api_token = sha1(uniqid(mt_rand(), true));
        $student->save();

        return \Response::json([
            'api_token' => $student->api_token,
            'family_name' => $student->family_name,
            'given_name' => $student->given_name,
            'confirmed' => $student->confirmed
        ], 200);
    }

    public function apitoken(CheckApitokenRequest $request)
    {
        $student = $this->findByApitoken($request->api_token);

        // $student->api_token = sha1(uniqid(mt_rand(), true));
        // $student->save();

        return \Response::json([
            'confirmed' => $student->confirmed,
            'api_token' => $student->api_token
        ], 200);
    }

    /**
     * Get student from email
     */
    public function findByEmail($email) {
        $student = Student::where('email', $email)->first();

        if (!$student instanceof Student) {
            throw new ApiException('email.not_found');
        }

        return $student;
    }

    /**
     * Get student from API token
     */
    public function findByApitoken($api_token) {
        $student = Student::where('api_token', $api_token)->first();

        if (!$student instanceof Student) {
            throw new ApiException('api_token.not_found');
        }

        return $student;
    }

    /**
     * Get student from confirmation code
     */
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
