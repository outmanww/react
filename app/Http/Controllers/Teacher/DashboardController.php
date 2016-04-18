<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

/**
 * Class DashboardController
 * @package App\Http\Controllers
 */
class DashboardController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index($school)
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        return view('teacher.index', compact('domain', 'env', 'school'));
    }

    /**
     * @return \Illuminate\View\View
     */
    public function profile($school)
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        return view('teacher.index', compact('domain', 'env', 'school'));
    }

    /**
     * @return \Illuminate\View\View
     */
    public function test()
    {
        $user = \Auth::guard('users')->user();
        $room = $user->rooms()->where('closed_at', null)->first();

        $charts = $room->getChartData(5, 5);

        return \Response::json($charts, 200);
    }

    public function now()
    {
        return \Carbon\Carbon::now();
    }

}
