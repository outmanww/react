<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
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
        $check_key_rst = $this->checkRoomKey($key);
        
        if (!$check_key_rst['status'])
            return \Response::json($check_key_rst['err_msg'], 400);

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $dbName = Affiliation::find($affiliation_id)->db_name;
        $room = new Room;
        $room = $room->setConnection($dbName);
        $room = $room->where('key', $key)
            ->select('lecture_id', 'teacher_id', 'closed_at')->firstOrFail();

        $weekday = $this->weeks[$room->lecture->weekday];
    
        $results = array(
            'lecture' => $room->lecture->title,
            'teacher' => $room->teacher->family_name.' '.$room->teacher->given_name,
            'timeslot' => $weekday.$room->lecture->time_slot
            );

        return \Response::json($results, 200); 
    }

    /**
     * @return Response
     */
    public function action(StudentActionRequest $request, $key)
    {
        $now = Carbon::now();
        $student = \Auth::guard('students_api')->user();

        $check_key_rst = $this->checkRoomKey($key);
        
        if (!$check_key_rst['status'])
            return \Response::json($check_key_rst['err_msg'], 400);

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));
        
        if($request->action == config('controller.action.basic'))
        {
            // get last basic event
            $last_basic = Reaction::lastBasic($student->id, $affiliation_id, $check_key_rst['id'])
                    ->select('type_id')->first();
            $last_basic_type = null;
            if(count($last_basic) > 0)
                $last_basic_type = $last_basic->type_id;

            // room_in event
            if($request->type == config('controller.b_type.room_in'))
            {
                if($last_basic_type != null && $last_basic_type != config('controller.b_type.room_out'))
                    return \Response::json('logical error in room in', 410);
                // check gps
                if($request->has('geo_lat') && $request->has('geo_long'))
                {
                    $dbName = Affiliation::find($affiliation_id)->db_name;
                    $room = new Room;
                    $room = $room->setConnection($dbName);
                    $room = $room->where('key', $key)->firstOrFail();
                    $campuses = $room->lecture->department->faculty->campuses;

                    $is_in_campus = false;
                    foreach($campuses as $campus)
                    {
                        /*
                        $distance = $this->haversineGreatCircleDistance(
                            $campus->geo_lat, $campus->geo_long,
                            $request->geo_lat, $request->geo_long);
                        if($distance <= $campus->range)*/
                        if($campus->inside($request->geo_lat, $request->geo_long))
                        {
                            $is_in_campus = true;
                            break;
                        }
                    }
                    if(!$is_in_campus)
                        return \Response::json('not in campus', 400);
                }
            }
            // room out event
            elseif($request->action == config('controller.action.basic'))
            {
                if($last_basic_type == null || $last_basic_type == config('controller.b_type.room_out'))
                    return \Response::json('logical error in room out', 411);

                // point calculation on room_out event
                $point = new Point;
                $point->calRoomPoint($affiliation_id, $check_key_rst['id'], $student->id, $now);
                if($point->point_diff > 0)
                    $point->save();
            }
            // fore in event
            elseif($request->type == config('controller.b_type.fore_in'))
            {
                if($last_basic_type == null || $last_basic_type == config('controller.b_type.room_out'))
                    return \Response::json('logical error in fore in', 412);
                // if the last event is not fore out event, ignore
                if($last_basic->type_id != config('controller.b_type.fore_out'))
                    return \Response::json('No need to fore in', 400);
            }
            // fore out event
            elseif($request->type == config('controller.b_type.fore_in'))
            {
                if($last_basic_type == null || $last_basic_type == config('controller.b_type.room_out'))
                    return \Response::json('logical error in fore out', 413);
                // if the last event is not fore out event, ignore
                if($last_basic->type_id == config('controller.b_type.fore_out'))
                    return \Response::json('No need to fore out', 400);
            }
        }

        // for message
        $new_msg = null;
        if($request->action == config('controller.action.message'))
        {
            $new_msg = $request->message;
        }
        $reaction_new = Reaction::insert([
            'student_id' => $student->id,
            'affiliation_id' => $affiliation_id,
            'action_id' => $request->action,
            'type_id' => $request->type,
            'room_id' => $check_key_rst['id'],
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

        $check_key_rst = $this->checkRoomKey($key);

        if (!$check_key_rst['status']) {
            return \Response::json($check_key_rst['err_msg'], 400);
        }

        $key = sprintf("%06d", $key);

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $num_confused = Reaction::inMinutes($affiliation_id, $check_key_rst['id'], config('controller.r_type.confused'), config('controller.interval_status_student'), $now)
           ->get()->count();
        $num_interesting = Reaction::inMinutes($affiliation_id, $check_key_rst['id'], config('controller.r_type.interesting'), config('controller.interval_status_student'), $now)
            ->get()->count();
        $num_boring = Reaction::inMinutes($affiliation_id, $check_key_rst['id'], config('controller.r_type.boring'), config('controller.interval_status_student'), $now)
           ->get()->count();

        // get last room in time
        $time_room_in = Reaction::lastRoomIn($student->id, $affiliation_id, $check_key_rst['id'])
            ->select('created_at')
            ->first();
        if(0 == count($time_room_in))
            return \Response::json('No room in event', 400);
        $time_room_in = Carbon::createFromFormat('Y-m-d H:i:s', $time_room_in->created_at);

        // get last fore in time
        $time_fore_in = Reaction::lastForeIn($student->id, $affiliation_id, $check_key_rst['id'])
            ->select('created_at')
            ->first();
        if(0 == count($time_fore_in))
        {
            $time_fore_in = $time_room_in;
        }
        else
        {
            $time_fore_in = Carbon::createFromFormat('Y-m-d H:i:s', $time_fore_in->created_at);
            if($time_fore_in->lt($time_room_in))
                $time_fore_in = $time_room_in;
        }

        $time_room_in = $now->diffInMinutes($time_room_in);
        $time_fore_in = $now->diffInMinutes($time_fore_in);

        $results = array(
            'num_confused' => $num_confused,
            'num_interesting' => $num_interesting,
            'num_boring' => $num_boring,
            'timediff_room_in' => $time_room_in,
            'timediff_fore_in' => $time_fore_in
            );

        return \Response::json($results, 200);
    }

    private static function checkRoomKey($key)
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

        $affiliation_id = substr($key, 0, config('controller.aff_idx_len'));

        $dbName = Affiliation::find($affiliation_id)->db_name;
        $room = new Room;
        $room = $room->setConnection($dbName);

        $room = $room->where('key', $key)
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

        $results['id'] = $room->id;
        
        return $results;
    }
}
/*
    private function haversineGreatCircleDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
    {
        // convert from degrees to radians
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
        cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return round($angle * $earthRadius, 2);
    }
}


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
