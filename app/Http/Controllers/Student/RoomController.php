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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function room($room_id)
    {
    	if ($room_id < 6) {
    		return '2&線形代数１&山田太郎&火曜' . $room_id . '限';
    	}
        return \Response::json('not found', 200);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function action()
    {

    }
}
