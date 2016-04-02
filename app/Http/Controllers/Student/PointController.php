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
        return \Response::json(Student::find(1)->points->sum('point_diff'), 200);
    }

    public static function calPoints($min)
    {
    	return floor($min/config('point.min_point_rate'));
    }
}
