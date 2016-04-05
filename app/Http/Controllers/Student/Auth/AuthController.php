<?php

namespace App\Http\Controllers\Student\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
//Requests
use Illuminate\Http\Request;
use App\Http\Requests\Student\Auth\SignupRequest;

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
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function signup(SignupRequest $request)
    {
        return \App\Models\Student\Student::create([
            'family_name' => $request->family_name,
            'given_name'  => $request->given_name,
            'email'       => $request->email,
            'password'    => null,
            'api_token'   => md5(uniqid(mt_rand(), true)),
            'confirmation_code' => md5(uniqid(mt_rand(), true)),
            'confirmed'   => config('access.users.confirm_email') ? 0 : 1,
            'status'      => 1,
        ]);
    }

    public function showLoginForm()
    {
        return view('student.signin');
    }

    /**
     * 
     */
    // public function login(Request $request)
    // {

    // }
}
