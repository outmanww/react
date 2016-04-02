<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Student\PointController;
// Models
use App\Models\Lecture\Room;
use App\Models\Lecture\Point;
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
        $check_key_rst = $this->checkRoomKey($key);
        
        if (!$check_key_rst['status']) {
            return \Response::json($check_key_rst['err_msg'], 400);
        }

        $key = sprintf("%06d", $key);

        $room = Room::where('key', $key)
            ->select('lecture_id', 'teacher_id', 'closed_at')->firstOrFail();

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

        $check_key_rst = $this->checkRoomKey($key);
        
        if (!$check_key_rst['status']) {
            return \Response::json($check_key_rst['err_msg'], 400);
        }

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));
        
        $new_msg = null;
        if($request->action == config('controller.action.message'))
        {
            $new_msg = $request->message;
        }
        $reaction_new = Reaction::create([
            'student_id' => $student->id,
            'affiliation_id' => 1,
            'action_id' => $request->action,
            'type_id' => $request->type,
            'room_id' => $check_key_rst['id'],
            'message' => $new_msg,
            ]);

        if($request->action == config('controller.action.basic') && $request->type == config('controller.b_type.room_out'))
        {
            $last_room_in = Reaction::fromRoomIn($student->id, $check_key_rst['id'])
                ->select('created_at')
                ->firstOrFail();

            $min_diff = $reaction_new->calDiffMin($last_room_in->created_at);
                    
            $new_points = PointController::calPoints($min_diff);

            if($new_points>0)
            {
                Point::insert([
                    'student_id' => $student->id,
                    'affiliation_id' => $affiliation_id,
                    'room_id' => $check_key_rst['id'],
                    'point_diff' => $new_points
                    ]);
            }
        }

        return \Response::json('Request OK!', 200);
    }

    /**
     * @return Response
     */
    public function status($key)
    {
        $student = Student::find(1);

        $check_key_rst = $this->checkRoomKey($key);
        
        if (!$check_key_rst['status']) {
            return \Response::json($check_key_rst['err_msg'], 400);
        }

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $num_confused = Reaction::inTenMinutes($check_key_rst['id'], config('controller.b_type.confused'))->count();
        $num_interesting = Reaction::inTenMinutes($check_key_rst['id'], config('controller.b_type.interesting'))->count();
        $num_boring = Reaction::inTenMinutes($check_key_rst['id'], config('controller.b_type.boring'))->count();

        $time_room_in = Reaction::fromRoomIn($student->id, $check_key_rst['id'])
            ->select('created_at')
            ->firstOrFail();
        $time_room_in = Carbon::createFromFormat('Y-m-d H:i:s', $time_room_in->created_at);

        $time_foreground = Reaction::fromForeground($student->id, $check_key_rst['id'])
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
            'num_confused' => $num_confused,
            'num_interesting' => $num_interesting,
            'num_boring' => $num_boring,
            'timediff_room_in' => $time_room_in,
            'timediff_foreground' => $time_foreground
            );

        return \Response::json($results, 200);
    }



    protected function checkRoomKey($key)
    {
        $results = array(
            'status' => true,
            'err_msg' => 'OK',
            'id' => null
            );

        if (!intval($key)) {
            $results['status']= false;
            $results['err_msg'] = 'room key must be integer';
            return $results;
        }

        $room = Room::where('key', $key)
            ->select('id', 'closed_at')
            ->first();

        if(empty($room)){
            $results['status']= false;
            $results['err_msg'] = 'room not found';
            return $results;
        }

        if($room['closed_at']){
            $results['status']= false;
            $results['err_msg'] = 'room closed';
            return $results;
        }

        $results['id'] = $room['id'];
        
        return $results;
    }
}

/*
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
*/