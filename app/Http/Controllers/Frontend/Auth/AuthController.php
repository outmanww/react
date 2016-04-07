<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Services\Access\Traits\ConfirmUsers;
use App\Services\Access\Traits\UseSocialite;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use App\Repositories\Frontend\User\UserContract;
use App\Services\Access\Traits\AuthenticatesAndRegistersUsers;

/**
 * Class AuthController
 * @package App\Http\Controllers\Frontend\Auth
 */
class AuthController extends Controller
{

    use AuthenticatesAndRegistersUsers, ConfirmUsers, ThrottlesLogins, UseSocialite;



    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/nagoya-u/teacher/dashboard';

    /**
     * Where to redirect Admin after login.
     *
     * @var string
     */
    protected $adminRedirectTo = '/nagoya-u/admin/dashboard';

    /**
     * Where to redirect users after they logout
     *
     * @var string
     */
    protected $redirectAfterLogout = '/schools';

    /**
     * @param UserContract $user
     */
    public function __construct(UserContract $user)
    {
        $this->redirectTo      = '/'.\Request::route('school').'/teacher/dashboard';
        $this->adminRedirectTo = '/'.\Request::route('school').'/admin/dashboard';
        $this->user            = $user;
    }

    /*
     * ユーザーロールによってログイン後のリダイレクト先を変更
     * vendor/laravel/framework/src/Illuminate/Foundation/Auth/RedirectsUsers.php
     */
    public function redirectPath()
    {
        $user = \Auth::guard('users')->user();
        if ($user->hasRole('Teacher'))
        {
           return property_exists($this, 'redirectTo') ? $this->adminRedirectTo : '/schools';
        } else
        {
           return property_exists($this, 'adminRedirectTo') ? $this->redirectTo : '/schools';       
        }
    }
}