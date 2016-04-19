<?php

namespace App\Models\Point;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// Models
use App\Models\Student\Reaction;
// Carbon
use Carbon\Carbon;

class Point extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function Student()
    {
        return $this->belongsTo('App\Models\Student\Student');
    }
    public function Item()
    {
        return $this->belongsTo('App\Models\Point\Item');
    }
    public function Affiliation()
    {
        return $this->belongsTo('App\Models\Student\Affiliation');
    }

    public function calRoomPoint($affiliation_id, $room_id, $student_id, $end_time)
    {
        $this->point_diff = 0;
        $point_time = 0;
        // get all basic room events
        $basic_room_events = Reaction::allBasicEventByStudentID($affiliation_id, $room_id, $student_id, $end_time)
                                        ->orderBy('created_at')
                                        ->select('created_at', 'type_id')
                                        ->get();
        $new_points = 0;
        $last_start_time = null;

        // calculate point time
        foreach($basic_room_events as $basic_room_event)
        {
            $time_room_event = Carbon::createFromFormat('Y-m-d H:i:s', $basic_room_event['created_at']);

            if($basic_room_event->type_id == config('controller.b_type.room_out'))
                $new_points = 0;
            elseif($basic_room_event->type_id == config('controller.b_type.room_in'))
                $last_start_time = $time_room_event;
            elseif($basic_room_event->type_id == config('controller.b_type.fore_in'))
                $last_start_time = $time_room_event;
            elseif($basic_room_event->type_id == config('controller.b_type.fore_out'))
            {
                if($last_start_time == null)
                    return;
                $new_points += $this->getPointsFromTime($time_room_event->diffInMinutes($last_start_time));
            }
        }

        if($last_start_time == null)
            return;
        $last_room_event = $basic_room_events[count($basic_room_events)-1];
        if($last_room_event->type_id == config('controller.b_type.fore_in') ||
           $last_room_event->type_id == config('controller.b_type.room_in'))
            $new_points += $this->getPointsFromTime($end_time->diffInMinutes($last_start_time));

        // save property
        $this->affiliation_id = $affiliation_id;
        $this->room_id = $room_id;
        $this->student_id = $student_id;
        $this->point_diff = $new_points;
    }
                
    public function scopeLastRoom($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('student_id', $student_id)
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->orderBy('created_at','desc');
    }

    private function getPointsFromTime($min)
    {
        return floor($min/config('controller.min_point_rate'));
    }
}