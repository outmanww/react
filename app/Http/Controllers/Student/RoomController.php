<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * Class RoomController
 * @package App\Http\Controllers\Student
 */
class RoomController extends Controller
{
    /**
     * @return Response
     */
    public function room($room_id)
    {
    	if ($room_id < 6) {
    		return '線形代数１&山田太郎&火曜' . $room_id . '限';
    	}
        return \Response::json('not found', 400);
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
