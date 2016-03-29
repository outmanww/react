<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
// Models
use App\Models\Lecture\Room;
// Exceptions
// use App\Exceptions\ApiException;

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
            ->select('lecture_id', 'teacher_id', 'length', 'closed_at')
            ->first();

        if(empty($room)){
            return \Response::json('room not found', 400);
        }

        if(!is_null($room['closed_at'])){
            return \Response::json('room has been already closed', 400);
        }

        $results = array(
            'lecture_name' => $room['lecture']['title'],
            'teacher_name' => $room['teacher']['family_name']);

        return \Response::json($results, 200);    
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
