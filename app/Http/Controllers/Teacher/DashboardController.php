<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
//Models
use App\Models\Lecture\Room;
use App\Models\Student\Reaction;
//Exceptions
use App\Exceptions\ApiException;
use Carbon\Carbon;

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

        $basic = Reaction::allBasicEvent(1, $room->id)
            ->select(['student_id', 'type_id', 'created_at'])
            ->get()
            ->map(function ($item, $key) {
                return [
                    'student_id' => intval($item->student_id),
                    'type_id' => intval($item->type_id),
                    'created_at' => $item->created_at->timestamp
                ];
            });

        $reactions = Reaction::allReactionEvent(1, $room->id)
            ->select(['student_id', 'type_id', 'created_at'])
            ->get()
            ->map(function ($item, $key) {
                return [
                    'student_id' => intval($item->student_id),
                    'type_id' => intval($item->type_id),
                    'created_at' => $item->created_at->timestamp
                ];
            });

        $charts = $room->getChartData(1, 2);

        return \Response::json([
            'exist' => true,
            'room' => $room,
            'basic' => $basic,
            'reactions' => $reactions,
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

    public function test2()
    {
        $user = \Auth::guard('users')->user();
        $room = $user
            ->rooms()
            ->where('closed_at', null)
            ->select('id', 'lecture_id', 'length', 'created_at', 'key')
            ->first();

        $reactions = Reaction::allReactionEvent(1, $room->id)
            // ->select(DB::raw('student_id, type_id, MAX(created_at)'))
            ->select(['student_id', 'type_id', 'created_at'])
            // ->groupBy('student_id')
            ->get();

        $next = $reactions->map(function ($item, $key) {
            return [
                'student_id' => $item->student_id,
                'type_id' => $item->type_id,
                'created_at' => $item->created_at->timestamp
            ];
        });

        return \Response::json([
            'room' => $room,
            'reactions' => $next
            // 'reactions' => [
            //     '0' => [
            //         'student_id' => 1,
            //         'type_id' => 1,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 30, 00)->timestamp
            //     ],
            //     '1' => [
            //         'student_id' => 1,
            //         'type_id' => 1,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 32, 00)->timestamp
            //     ],
            //     '2' => [
            //         'student_id' => 2,
            //         'type_id' => 1,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 34, 00)->timestamp
            //     ],
            //     '3' => [
            //         'student_id' => 2,
            //         'type_id' => 2,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 35, 00)->timestamp
            //     ],
            //     '4' => [
            //         'student_id' => 2,
            //         'type_id' => 3,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 36, 00)->timestamp
            //     ]
            // ]
        ], 200);
    }
}
