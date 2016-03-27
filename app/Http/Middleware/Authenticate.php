<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

/**
 * Class Authenticate
 * @package App\Http\Middleware
 */
class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->guest()) {
            if ($request->ajax() || $request->wantsJson()) {
                return response('Unauthorized.', 401);
            } else {

                /*
                 * 未ログインであればルートパラメーターからschool_nameを取得して
                 * schoolごとの signin page へリダイレクト
                 */
                $school_name = $request->route('school');
                return redirect()->guest($school_name . '/signin');
            }
        }

        return $next($request);
    }
}