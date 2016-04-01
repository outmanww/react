<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Lecture\Point;
// Exceptions
use App\Exceptions\ApiException;

use Carbon\Carbon;

/**
 * Class RoomController
 * @package App\Http\Controllers\Student
 */
class PointController extends Controller
{
    /**
     * @return Response
     */
    public function point()
    {
        $room = Room::where('key', $key)
            ->with([
                'lecture' => function ($query) {
                    $query->select('id', 'title', 'department_id');
                },
                'lecture.department' => function ($query) {
                    $query->select('id', 'name', 'faculty_id');
                },
                'lecture.department.faculty' => function ($query) {
                    $query->select('id', 'name');
                },
                'teacher' => function ($query) {
                    $query->select('id', 'family_name', 'given_name');
                }
            ])
            ->select('lecture_id', 'teacher_id', 'length')
            ->first();

        return \Response::json($room, 200);    
    }
}
