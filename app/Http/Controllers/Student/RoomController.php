<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Lecture\Room;

/**
 * Class RoomController
 * @package App\Http\Controllers\Student
 */
class RoomController extends Controller
{
    /**
     * @return Response
     */
    public function room($key)
    {
        if (!intval($key)) {
            return \Response::json('room_key must be integer', 400);
        }

    	if (strlen($key) !== 6) {
            return \Response::json('room_key must be 6 characters', 400);
    	}

        $room = Room::where('key', $key)->with(['lecture.department'])->first();
        return \Response::json($room, 200);    
    }

    /**
     * @return Response
     */
    public function action($room_id)
    {
    	if ($room_id < 6) {
    		return \Response::json('success', 200);
    	}
        return \Response::json('not found', 400);
    }

    /**
     * @return Response
     */
    public function status($room_id)
    {
    	if ($room_id < 6) {
	    	$rand = rand(0 , 20);
	    	return $rand;
       	}

        return \Response::json('not found', 400);
    }
}
