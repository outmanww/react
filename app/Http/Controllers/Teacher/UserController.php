<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function info($school)
    {
        $user = \Auth::guard('users')->user();
        $name = $user->family_name . " " . $user->given_name;
        $lectures = $user->lectures()->count();

        return \Response::json([
            'hasRole' => $user->hasRole('Teacher'),
            'email' => $user->email,
            'id' => $user->id,
            'name' => $name,
            'lectures' => $lectures
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function profile($school)
    {
        $user = \Auth::guard('users')->user();
        return \Response::json($user, 200);
    }
}
