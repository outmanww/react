<?php

namespace App\Http\Controllers\Conference;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
//use App\Repositories\Teacher\Lecture\LectureContract;
//Models
use App\Models\Conference\User;
use App\Models\Conference\Conference;
//Requests
use Illuminate\Http\Request;
//Exceptions
use App\Exceptions\ApiException;

/**
 * Class LectureController
 */
class LectureController extends Controller
{
    // /**
    //  * @var FlightContract
    //  */
    // protected $lectures;

    // *
    //  * @param FlightContract $lectures
     
    // public function __construct(LectureContract $lectures)
    // {
    //     $this->lectures = $lectures;
    // }

    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        $school = 'conference';

        return view('teacher.index', compact('domain', 'env', 'school'));
    }

    /**
     * @return \Illuminate\View\View
     */
    public function search(SearchLectureRequest $request)
    {
        $overlappedLecture = Lecture::with([
                'users' => function ($query) {
                    $query->select('users.id', 'family_name', 'given_name');
                },
                'semester' => function ($query) {
                    $query->select('id', 'name');
                },
                'department' => function ($query) {
                    $query->select('id', 'name', 'faculty_id');
                },
                'department.faculty' => function ($query) {
                    $query->select('id', 'name');
                }
            ])
            ->where('code', $request->code)
            ->where('department_id', $request->department)
            ->where('year', explode("&", $request->year_semester)[0])
            ->where('semester_id', explode("&", $request->year_semester)[1])
            ->first();

        return \Response::json(['overlappedLecture' => $overlappedLecture], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function lectures()
    {
        // $user = \Auth::guard('users')->user();
        $user = User::first();
        $lectures = $user->conferences()->get();

        return \Response::json($lectures, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function lecture($id)
    {
        $lecture = Conference::find($id);

        if (!$lecture) {
            throw new ApiException('lecture.not_found');
        }

        // $user = \Auth::guard('users')->user();
        $user = User::first();

        // if (!$user->hasLecture($id)) {
        //     throw new ApiException('lecture.not_yours');
        // }

        return \Response::json(['lecture' => $lecture], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function store(Request $request)
    {
        // $user = \Auth::guard('users')->user();
        $user = User::first();

        $conference = new Conference;
        $conference->user_id = $user->id;
        $conference->title = $request->title;
        $conference->place = $request->place;
        $conference->description = $request->description;
        $conference->start_at = $request->time;
        $conference->save();

        return \Response::json('success', 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function open($id, Request $request)
    {
        $conference = Conference::find($id);
        $conference->status = 1;
        $conference->save();

        return \Response::json($conference, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function update($school, $id, UpdateLectureRequest $request)
    {
        $lecture = Lecture::with([
            'semester' => function ($query) {
                $query->select('id', 'name');
            }])
            ->find($id);

        if (!$lecture instanceof Lecture) {
            throw new ApiException('lecture.not_found');
        }

        $exploded = explode('&', $request->year_semester);

        $lecture->title = $request->title;
        $lecture->year = $exploded[0];
        $lecture->semester_id = $exploded[1];
        $lecture->weekday = $request->weekday;
        $lecture->time_slot = $request->time_slot;
        $lecture->place = $request->place;
        $lecture->length = $request->length;
        $lecture->description = $request->description;
        $lecture->save();

        return \Response::json(['lecture' => $lecture], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function activate($school, $id)
    {
        return \Response::json($id, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function deactivate($school, $id)
    {
        $lecture = Lecture::find($id);

        if (!$lecture instanceof Lecture) {
            throw new ApiException('lecture.not_found');
        }

        $user = \Auth::guard('users')->user();

        if (!$user->hasLecture($id)) {
            throw new ApiException('lecture.not_yours');
        }

        $lecture->status = 0;
        $lecture->save();

        $lectures = $user
            ->lectures()
            ->where('deleted_at', null)
            ->orderBy('created_at', 'desc')
            ->with([
                'department' => function ($query) {
                    $query->select('id', 'name', 'faculty_id');
                },
                'department.faculty' => function ($query) {
                    $query->select('id', 'name');
                },
                'rooms' => function ($query) {
                    $query->select('id', 'lecture_id');
                }
            ])
            ->get();

        return \Response::json($lectures, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function destroy($school, $id)
    {
        $lecture = Lecture::find($id);

        if (!$lecture instanceof Lecture) {
            throw new ApiException('lecture.not_found');
        }

        $user = \Auth::guard('users')->user();

        if (!$user->hasLecture($id)) {
            throw new ApiException('lecture.not_yours');
        }

        $lecture->delete();
        
        $lectures = $user
            ->lectures()
            ->where('deleted_at', null)
            ->orderBy('created_at', 'desc')
            ->with([
                'department' => function ($query) {
                    $query->select('id', 'name', 'faculty_id');
                },
                'department.faculty' => function ($query) {
                    $query->select('id', 'name');
                },
                'rooms' => function ($query) {
                    $query->select('id', 'lecture_id');
                }
            ])
            ->get();

        return \Response::json($lectures, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function restore($school, $id)
    {
        return \Response::json($id, 200);
    }
}
