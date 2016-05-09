<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
//use App\Repositories\Teacher\Lecture\LectureContract;
//Models
use App\Models\Lecture\Lecture;
use App\Models\Lecture\Room;
use App\Models\Lecture\Department;
use App\Models\Lecture\Faculty;
use App\Models\Lecture\Semester;
//Exceptions
use App\Exceptions\ApiException;
//Requests
use App\Http\Requests\Teacher\Lecture\SearchLectureRequest;
use App\Http\Requests\Teacher\Lecture\StoreLectureRequest;
use App\Http\Requests\Teacher\Lecture\JoinLectureRequest;
use App\Http\Requests\Teacher\Lecture\OpenRoomRequest;
use App\Http\Requests\Teacher\Lecture\UpdateLectureRequest;
// Carbon
use Carbon\Carbon;

/**
 * Class FrontendController
 * @package App\Http\Controllers
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
    public function index($school)
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
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
        $user = \Auth::guard('users')->user();

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
    public function lecture($school, $id)
    {
        $lecture = Lecture::find($id);

        if (!$lecture) {
            throw new ApiException('lecture.not_found');
        }

        $user = \Auth::guard('users')->user();

        if (!$user->hasLecture($id)) {
            throw new ApiException('lecture.not_yours');
        }

        $lecture = Lecture::with([
            'semester' => function ($query) {
                $query->select('id', 'name');
            },
            'department' => function ($query) {
                $query->select('id', 'name', 'faculty_id');
            },
            'department.faculty' => function ($query) {
                $query->select('id', 'name');
            },
            'rooms' => function ($query) {
                $query->select('id', 'lecture_id', 'teacher_id', 'created_at')->orderBy('created_at', 'desc');
            },
            'rooms.teacher' => function ($query) {
                $query->select('id', 'family_name', 'given_name');
            }])
            ->find($id);

        return \Response::json(['lecture' => $lecture], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function basic($school)
    {
        $user = \Auth::guard('users')
            ->user()
            ->department()
            ->with(['faculty' => function ($query) { $query->select('id', 'name'); }])
            ->first(['id', 'name', 'faculty_id']);

        $faculties = Faculty::with([
                'departments' => function ($query) {
                    $query->select('id', 'name', 'faculty_id');
                }
            ])
            ->orderBy('sort', 'asc')
            ->get(['id', 'name']);

        $semesters = Semester::all(['id', 'name']);
        $years = [ Carbon::now()->year, Carbon::now()->year - 1 ];
        $year_semester = [];

        foreach ($years as $year) {
            foreach ($semesters as $semester) {
                $year_semester += array($year.'&'.$semester->id => $year.'年 '.$semester->name);
            }
        }

        return \Response::json([
            'faculties' => [
                'default' => [
                    'faculty' => $user['faculty']['id'] !== null ? $user['faculty']['id'] : Faculty::first()->id,
                    'department' => $user['id'] !== null ? $user['faculty']['id'] : Department::first()->id,
                ],
                'data' => $faculties,
            ],
            'year_semester' => $year_semester,
            'all' => $semesters
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function store($school, StoreLectureRequest $request)
    {
        $exploded = explode('&', $request->year_semester);
        $year = $exploded[0];
        $semester = $exploded[1];

        $lecture = new Lecture;
        $lecture->title = $request->title;
        $lecture->department_id = $request->department;
        $lecture->code = $request->code;
        $lecture->grade = $request->grade;
        $lecture->place = $request->place;
        $lecture->weekday = $request->weekday;
        $lecture->time_slot = $request->time_slot;
        $lecture->length = $request->length;
        $lecture->year = $year;
        $lecture->semester_id = $semester;
        $lecture->description = $request->description;
        $lecture->status = 1;
        $lecture->save();

        $user = \Auth::guard('users')->user();
        $user->lectures()->attach($lecture->id);

        return \Response::json('success', 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function join($school, JoinLectureRequest $request)
    {
        $user = \Auth::guard('users')->user();
        $user->lectures()->attach($request->id);

        return \Response::json('success', 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function open($school, $id, OpenRoomRequest $request)
    {
        $user = \Auth::guard('users')->user();

        if ($user->hasActiveRoom()) {
            throw new ApiException('user.alreadyHasRoom');
        }

        $room = new Room;

        if (!$room->genKey()) {
            throw new ApiException('room.overSize');
        }

        $room->lecture_id = $id;
        $room->teacher_id = $user->id;
        $room->length = $request->length;
        $room->save();

        return \Response::json($room, 200);
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
