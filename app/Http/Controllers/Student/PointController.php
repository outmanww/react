<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Exceptions
use App\Exceptions\ApiException;
//Models
use App\Models\Point\Point;
use App\Models\Point\Item;
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
     * check user current points
     */
    public function point()
    {
        $student = \Auth::guard('students_api')->user();
        return \Response::json(['points' => $student->points->sum('point_diff')], 200); 
    }

    /**
     * @return Response
     * use points in shopping
     */
    public function usePoint(UsePointRequest $request)
    {
        $student = \Auth::guard('students')->user();
        $item = Item::find($request->item_id);
        if (!$item instanceof Item) {
            throw new ApiException('item.not_found');
        }

        $item_points = $request->amount*$item->point;
        Point::insert([
            'student_id' => $student->id,
            'item_id' => $request->item_id,
            'amount' => $request->amount,
            'point_diff' => (0-$item_points),
            ]);
        return \Response::json("OK", 200);
    }

    public function roomPoints($key)
    {
        $room = RoomController::getRoomByKey($key);

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $student = \Auth::guard('students')->user();

        $points = Point::lastRoom($student->id, $affiliation_id, $room->id)
            ->select('point_diff')
            ->first();

        if(empty($points))
            $points=0;
        else
            $points=$points->point_diff;
        
        return \Response::json($points, 200);
    }
}
