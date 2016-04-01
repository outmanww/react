<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
// Models
use App\Models\Lecture\Room;
use App\Models\Student\Reaction;
use App\Models\Student\Student;
// Request
use App\Http\Requests\Student\StudentActionRequest;
// Carbon
use Carbon\Carbon;

/**
 * Class RoomController
 * @package App\Http\Controllers\Student
 */
class RoomController extends Controller
{

    protected $weeks = ['日','月','火','水','木','金','土'];

    /**
     * @return Response
     */
    public function room($key)
    {
        if (!intval($key)) {
            return \Response::json('room key must be integer', 400);
        }

        $key = sprintf("%06d", $key);

        $room = Room::with([
                'lecture' => function ($query) {
                    $query->select('id', 'title', 'time_slot', 'weekday');
                },
                'teacher' => function ($query) {
                    $query->select('id', 'family_name', 'given_name');
                }
            ])
            ->where('key', $key)
            ->select('lecture_id', 'teacher_id', 'length', 'closed_at')
            ->firstOrFail();

        if(!is_null($room['closed_at'])){
            return \Response::json('room has been already closed', 400);
        }

        $weekday = $this->weeks[$room->lecture->weekday];
    
        $results = array(
            'lecture' => $room->lecture->title,
            'teacher' => $room->teacher->family_name.$room->teacher->given_name,
            'timeslot' => $weekday.$room->lecture->time_slot
            );

        return \Response::json($results, 200); 
    }

    /**
     * @return Response
     */
    public function action(StudentActionRequest $request, $key)
    {
        $student = Student::find(1);
        
        if (!intval($key)) {
            return \Response::json('room_key must be integer', 400);
        }
        $key = sprintf("%06d", $key);
/*
        if (strlen($key) !== 6) {
            return \Response::json('room_key must be 6 characters', 400);
        }
*/
        $room = Room::where('key', $key)
            ->select('id', 'closed_at')
            ->firstOrFail();

        if(!is_null($room['closed_at'])){
            return \Response::json('room has been already closed', 400);
        }

        $affiliation_id = substr($key, 0,3);
        
        Reaction::insert([
            'student_id' => $student->id,
            'affiliation_id' => $affiliation_id,
            'action_id' => $request->action,
            'type_id' => $request->type,
            'room_id' => $room['id']
            ]);
        
        return \Response::json('Request OK!', 200);
    }

    /**
     * @return Response
     */
    public function status($key)
    {
        $student = Student::find(1);
        
        if (!intval($key)) {
            return \Response::json('room key must be integer', 400);
        }
        $key = sprintf("%06d", $key);

        $room = Room::where('key', $key)
            ->select('id', 'closed_at')
            ->firstOrFail();

        if(!is_null($room['closed_at'])){
            return \Response::json('room has been already closed', 400);
        }

        $affiliation_id = substr($key, 0,3);

        $num_type1 = Reaction::inTenMinutes($room->id, 1)->count();
        $num_type2 = Reaction::inTenMinutes($room->id, 2)->count();
        $num_type3 = Reaction::inTenMinutes($room->id, 3)->count();

        $time_room_in = Reaction::fromRoomIn($student->id, $room->id)
            ->select('created_at')
            ->firstOrFail();
        $time_room_in = Carbon::createFromFormat('Y-m-d H:i:s', $time_room_in->created_at);

        $time_foreground = Reaction::fromForeground($student->id, $room->id)
            ->select('created_at')
            ->first();

        if(empty($time_foreground)){
            $time_foreground = $time_room_in;
        }
        else{
            $time_foreground = Carbon::createFromFormat('Y-m-d H:i:s', $time_foreground->created_at);
        }

        if($time_foreground->ne($time_room_in)){
            $time_foreground = $time_room_in;
        }

        $time_room_in = Carbon::now()->diffInMinutes($time_room_in);
        $time_foreground = Carbon::now()->diffInMinutes($time_foreground);

        $results = array(
            'type_1' => $num_type1,
            'type_2' => $num_type2,
            'type_3' => $num_type3,
            'room_in' => $time_room_in,
            'foreground' => $time_foreground
            );

        return \Response::json($results, 200);
    }
}
