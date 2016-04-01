<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Lecture\Point;
use App\Models\Student\Student;
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
        $points = Student::find(1)->points->;

        return \Response::json($room, 200);    
    }
}
