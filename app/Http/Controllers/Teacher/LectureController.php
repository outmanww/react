<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
//use App\Repositories\Teacher\Lecture\LectureContract;
//Models
use App\Models\Lecture\Lecture;
use App\Models\Lecture\Department;
use App\Models\Lecture\Faculty;
//Exceptions
use App\Exceptions\ApiException;
//Requests
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
    public function lectures()
    {
        $user = \Auth::guard('users')->user();

        $lectures = $user
            ->lectures()
            ->with([
                'department' => function ($query) {
                    $query->select('id', 'name', 'faculty_id');
                },
                'department.faculty' => function ($query) {
                    $query->select('id', 'name');
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
            throw new ApiException('lecture.notFound');
        }

        $user = \Auth::guard('users')->user();

        if (!$user->hasLecture($id)) {
            throw new ApiException('lecture.notYours');
        }

        $lecture = Lecture::with([
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

        $semesters = ['0' => '前期', '1' => '後期', '2' => 'その他'];
        $years = [ Carbon::now()->year - 1, Carbon::now()->year ];
        $year_semester = [];

        foreach ($years as $year) {
            foreach ($semesters as $key => $semester) {
                $year_semester += array($year.'/'.$key => $year.' '.$semester);
            }
        }

        return \Response::json([
            'faculties' => [
                'default' => [
                    'faculty' => $user['faculty']['id'],
                    'department' => $user['id']
                ],
                'data' => $faculties,
            ],
            'year_semester' => $year_semester
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function store($school, StoreLectureRequest $request)
    {
        return \Response::json($request, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function update($school, $id, UpdateLectureRequest $request)
    {
        return \Response::json($request, 200);
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
        return \Response::json($id, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function destroy($school, $id)
    {
        return \Response::json($id, 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function restore($school, $id)
    {
        return \Response::json($id, 200);
    }
}
