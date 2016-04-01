<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
//use App\Repositories\Teacher\Lecture\LectureContract;
//Models
use App\Models\Lecture\Room;
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

        $user = \Auth::user();

        if (!$user->hasLecture($id)) {
            throw new ApiException('lecture.notYours');
        }

        return \Response::json($lectures, 200);
    }
}
