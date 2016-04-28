<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Exceptions
use App\Exceptions\ApiException;
// Models
use App\Models\Lecture\Room;
use App\Models\Point\Point;
use App\Models\Student\Affiliation;
use App\Models\Student\Reaction;
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
        $room = $this->getRoomByKey($key);

        $weekday = $this->weeks[$room->lecture->weekday];
    
        $results = ['lecture' => $room->lecture->title,
            'teacher' => $room->teacher->family_name.' '.$room->teacher->given_name,
            'timeslot' => $weekday.$room->lecture->time_slot];

        return \Response::json($results, 200); 
    }

    /**
     * @return Response
     */
    public function action(StudentActionRequest $request, $key)
    {
        $now = Carbon::now();
        $student = \Auth::guard('students_api')->user();

        $room = $this->getRoomByKey($key);
        
        $key = sprintf("%06d", $key);
        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        // handle basic event
        if($request->action == config('controller.action.basic'))
        {
            // get last basic event
            $last_basic = Reaction::lastBasic($student->id, $affiliation_id, $room->id)
                    ->select('type_id')->first();
            $last_basic_type = null;
            if($last_basic instanceof Reaction)
                $last_basic_type = $last_basic->type_id;

            // room_in event
            if($request->type == config('controller.b_type.room_in'))
            {
                if($last_basic_type != null && $last_basic_type != config('controller.b_type.room_out'))
                    throw new ApiException('room.already_room_in');

                // check gps
                if($request->has('geo_lat') && $request->has('geo_long'))
                {
                    $campuses = $room->lecture->department->faculty->campuses;

                    $is_in_campus = false;
                    foreach($campuses as $campus)
                    {
                        if($campus->inside($request->geo_lat, $request->geo_long))
                        {
                            $is_in_campus = true;
                            break;
                        }
                    }
                    if(!$is_in_campus)
                        throw new ApiException('room.not_in_campus');
                }
            }

            // room out event
            elseif($request->type == config('controller.b_type.room_out'))
            {
                if($last_basic_type == null || $last_basic_type == config('controller.b_type.room_out'))
                    throw new ApiException('room.already_room_out');

                // point calculation on room_out event
                $point = new Point;
                $point->calRoomPoint($affiliation_id, $room->id, $student->id, $now);
                if($point->point_diff > 0)
                    $point->save();
            }
            // fore in event
            elseif($request->type == config('controller.b_type.fore_in'))
            {
                if($last_basic_type == null || $last_basic_type == config('controller.b_type.room_out'))
                    throw new ApiException('room.already_room_out');
                if($last_basic_type == config('controller.b_type.room_in') || $last_basic_type == config('controller.b_type.fore_in'))
                    throw new ApiException('room.already_fore_in');
            }
            // fore out event
            elseif($request->type == config('controller.b_type.fore_out'))
            {
                if($last_basic_type == null || $last_basic_type == config('controller.b_type.room_out'))
                    throw new ApiException('room.already_room_out');
                if($last_basic->type_id == config('controller.b_type.fore_out'))
                    throw new ApiException('room.already_fore_out');
            }
        }

        // handle message event
        $new_msg = null;
        if($request->action == config('controller.action.message'))
            $new_msg = $request->message;
        
        $reaction_new = Reaction::insert([
            'student_id' => $student->id,
            'affiliation_id' => $affiliation_id,
            'action_id' => $request->action,
            'type_id' => $request->type,
            'room_id' => $room->id,
            'message' => $new_msg,
            ]);

        return \Response::json('Request OK!', 200);
    }

    /**
     * @return Response
     */
    public function status($key)
    {
        $now = Carbon::now();

        $student = \Auth::guard('students_api')->user();

        $room = $this->getRoomByKey($key);
        
        $key = sprintf("%06d", $key);
        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $num_confused = Reaction::inMinutes(
                $affiliation_id,
                $room->id,
                config('controller.r_type.confused'),
                config('controller.interval_status_student'),
                $now->copy()
            )
           ->get()
           ->count();

        $num_interesting = Reaction::inMinutes(
                $affiliation_id,
                $room->id,
                config('controller.r_type.interesting'),
                config('controller.interval_status_student'),
                $now->copy()
            )
            ->get()
            ->count();

        $num_boring = Reaction::inMinutes(
                $affiliation_id,
                $room->id,
                config('controller.r_type.boring'),
                config('controller.interval_status_student'),
                $now->copy()
            )
           ->get()
           ->count();

        // get last room in time
        $room_in = Reaction::lastRoomIn(
                $student->id,
                $affiliation_id,
                $room->id
            )
            ->first()->created_at;

        if(!$room_in instanceof Reaction)
            throw new ApiException('room.not_room_in');

        $time_room_in = $room_in->created_at;

        // get last fore in time
        $fore_in = Reaction::lastForeIn(
                $student->id,
                $affiliation_id,
                $room->id
            )
            ->first();
        $time_fore_in = null;
        if((!$fore_in instanceof Reaction) || $fore_in->created_at->lt($time_room_in))
            $time_fore_in = $time_room_in;
        else
            $time_fore_in = $fore_in->created_at;

        $time_room_in = $time_room_in->diffInMinutes($now);
        $time_fore_in = $time_fore_in->diffInMinutes($now);

        return \Response::json([
            'num_confused' => $num_confused,
            'num_interesting' => $num_interesting,
            'num_boring' => $num_boring,
            'timediff_room_in' => $time_room_in,
            'timediff_fore_in' => $time_fore_in
            ], 200);
    }

    public static function getRoomByKey($key)
    {
        if (!intval($key))
            throw new ApiException('room.not_integer');

        $key = sprintf("%06d", $key);
        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));
        $dbName = Affiliation::find($affiliation_id)->db_name;
        $room = new Room;
        $room = $room->setConnection($dbName);

        $room = $room->where('key', $key)->first();

        if(!$room instanceof Room)
            throw new ApiException('room.not_found');

        if($room->closed_at)
            throw new ApiException('room.closed');

        return $room;
    }
}
