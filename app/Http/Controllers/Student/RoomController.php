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

    protected $weeks = ['月','火','水','木','金','土','日'];

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
                    $query->select('id', 'title', 'time_slot');
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

        $time_slot = $room->lecture->time_slot - 1;
        $slot = $time_slot % 5;
        $weekday = $this->weeks[floor($time_slot / 5)];
        $slot = $slot + 1;
    
        $results = array(
            'lecture' => $room->lecture->title,
            'teacher' => $room->teacher->family_name.$room->teacher->given_name,
            'timeslot' => $weekday.$slot
            );

        return \Response::json($results, 200); 
    }

    /**
     * @return Response
     */
    public function action(StudentActionRequest $request, $key)
    {
        $student = Student::find(1);
        $action = $request->action;
        
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
/*
        $reaction = new Reaction;
        $reaction->student_id = $user->id;
        $reaction->affiliation_id = $affiliation_id;
        $reaction->type_id = $action;
        $reaction->room_id = $room->id;
        $reaction->save();
        */
        
        
        Reaction::insert([
            'student_id' => $student->id,
            'affiliation_id' => $affiliation_id,
            'type_id' => $action,
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



        $current_time = Carbon::now();
        $num_react = Reaction::where('room_id', $room->id)
            ->where('type_id', 5)
            ->where('created_at', '>', $current_time->subMinutes(10))
            ->count();

        $time_room_in = Reaction::where('room_id', $room->id)
            ->where('type_id', 1)
            ->where('student_id', $student->id)
            ->orderBy('created_at','desc')
            ->select('created_at')
            ->firstOrFail();

        $time_room_in = Carbon::createFromFormat('Y-m-d H:i:s', $time_room_in->created_at);
        
        $time_foreground = Reaction::where('room_id', $room->id)
            ->where('type_id', 4)
            ->where('student_id', $student->id)
            ->orderBy('created_at','desc')
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

        $time_room_in = $current_time->diffInMinutes($time_room_in);
        $time_foreground = $current_time->diffInMinutes($time_foreground);

        $results = array(
            'reaction' => $num_react,
            'room_in' => $time_room_in,
            'foreground' => $time_foreground
            );

        return \Response::json($results, 200);
    }
/*
    protected function checkRoomKey($key)
    {
        $results = array(
            'status' => true,
            'message' => 'OK',
            'id' => null
            );

        if (!intval($key)) {
            $results->status = false;
            $results->msg = 'room key must be integer';
            return $results;
        }

        $key = sprintf("%06d", $key);

        $room = Room::where('key', $key)
            ->select('id', 'closed_at')
            ->first();

        if(empty($room)){
            $results->status = false;
            $results->msg = 'room not found';
            return $results;
        }

        if(!is_null($room['closed_at'])){
            $results->status = false;
            $results->msg = 'room closed';
            return $results;
        }

        $results->id = $rooms->id;
        return $results;
    }
    */
}
