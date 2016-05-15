<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
//Models
use App\Models\Lecture\Room;
//Exceptions
use App\Exceptions\ApiException;

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
        $room = $user
            ->rooms()
            ->where('closed_at', null)
            ->with([
                'lecture' => function ($query) {
                    $query->select('id', 'department_id', 'semester_id', 'title', 'year', 'weekday', 'time_slot', 'grade');
                },
                'lecture.semester' => function ($query) {
                    $query->select('id', 'name');
                },
                'lecture.department' => function ($query) {
                    $query->select('id', 'faculty_id', 'name');
                },
                'lecture.department.faculty' => function ($query) {
                    $query->select('id', 'name');
                }
            ])
            ->select('id', 'lecture_id', 'length', 'created_at', 'key')
            ->first();

        if (!$room instanceof Room) {
            return \Response::json([
                'exist' => false,
                'charts' => [ 'line' => null, 'pie' => null ]
            ], 200);
        }

        $charts = $room->getChartData(1, 2);

        return \Response::json([
            'exist' => true,
            'room' => $room,
            'charts' => $charts
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function message()
    {
        $user = \Auth::guard('users')->user();
        $room = $user->rooms()->where('closed_at', null)->first();

        if (!$room instanceof Room) {
            return \Response::json(null, 200);
        }

        $messages = $room->getMessage();

        return \Response::json($messages, 200);
    }
}
