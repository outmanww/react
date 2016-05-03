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
        $room = Room::find($id);

        if (!$room) {
            throw new ApiException('room.notFound');
        }

        $user = \Auth::guard('users')->user();

        if (!$user->hasRoom($id)) {
            throw new ApiException('room.notYours');
        }

        $reaction = Reaction::where('room_id', $id)->get();

        return \Response::json(['room' => $reaction], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function room($school, $id)
    {
        
    }
}
