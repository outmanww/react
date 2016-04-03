<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Point\Point;
use App\Models\Point\Item;
use App\Models\Student\Student;
// Exceptions
use App\Exceptions\ApiException;
// Request
use App\Http\Requests\Student\UsePointRequest;
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
        $results = array(
            'points' => Student::find(1)->points->sum('point_diff')
            );
        return \Response::json($results, 200); 
    }

    public function roomPoints($key)
    {
        $check_key_rst = RoomController::checkRoomKey($key);
        
        if (!$check_key_rst['status']) {
            return \Response::json($check_key_rst['err_msg'], 400);
        }

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $student = Student::find(1);

        $points = Point::lastRoom($student->id, $affiliation_id, $check_key_rst['id'])
            ->select('point_diff')
            ->first();

        if(empty($points))
        {
            $points=0;
        }
        else
        {
            $points=$points->point_diff;
        }
        return \Response::json($points, 200);
    }

    public function use(UsePointRequest $request)
    {
        $student = Student::find(1);
        $item_points = $request->amount*Item::findOrFail($request->item_id)->point;
        Point::insert([
            'student_id' => $student->id,
            'item_id' => $request->item_id,
            'amount' => $request->amount,
            'point_diff' => (0-$item_points),
            ]);
        return \Response::json("OK", 200);
    }

    public static function calPoints($min)
    {
    	return floor($min/config('controller.min_point_rate'));
    }
}
