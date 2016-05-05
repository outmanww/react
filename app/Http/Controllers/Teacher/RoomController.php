<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
//use App\Repositories\Teacher\Lecture\LectureContract;
//Models
use App\Models\Lecture\Room;
use App\Models\Student\Reaction;
//Exceptions
use App\Exceptions\ApiException;
//Requests
use App\Http\Requests\Teacher\Lecture\UpdateLectureRequest;

/**
 * Class RoomController
 * @package App\Http\Controllers
 */
class RoomController extends Controller
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
    public function room($school, $id)
    {
        $room = $this->findByID($id);
        $charts = [
            'attendance' => explode(",", $room->history_attendance),
            'confused' => explode(",", $room->history_confused),
            'interesting' => explode(",", $room->history_interesting),
            'boring' => explode(",", $room->history_boring)
        ];

        $messages = $room->getMessage();

        return \Response::json([
            'room' => [
                'charts' => $charts,
                'messages' => $messages,
            ]
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function closeRoom($school, $id)
    {
        $room = $this->findByID($id);
        $room->closeRoom(5);

        return \Response::json('success', 200);
    }

    protected function findByID($id)
    {
        $room = Room::find($id);

        if (!$room) {
            throw new ApiException('room.not_found');
        }

        $user = \Auth::guard('users')->user();

        if (!$user->hasRoom($id)) {
            throw new ApiException('room.not_yours');
        }

        return $room;
    }

}
