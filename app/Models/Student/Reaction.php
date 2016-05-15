<?php

namespace App\Models\Student;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// Carbon
use Carbon\Carbon;

class Reaction extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at'];
    /**
     * The attributes that are not mass assignable.
     */
//    protected $fillable = ['student_id', 'affiliation_id', 'room_id', 'type_id'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function Student()
    {
        return $this->belongsTo('App\Models\Student\Student');
    }
    public function Affiliation()
    {
        return $this->belongsTo('App\Models\Student\Affiliation');
    }
    public function ReactionType()
    {
        return $this->belongsTo('App\Models\Student\ReactionType');
    }
    public function scopeInMinutes($query, $affiliation_id, $room_id, $type, $interval, $end_time)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->where('type_id', $type)
            ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('created_at', '>', $end_time->subMinutes($interval))
            ->groupBy('student_id');
    }
    public function scopeLastRoomIn($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('action_id', config('controller.action.basic'))
            ->where('type_id', config('controller.b_type.room_in'))
            ->orderBy('created_at','desc');
    }
    public function scopeLastForeIn($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('action_id', config('controller.action.basic'))
            ->where('type_id', config('controller.b_type.fore_in'))
            ->orderBy('created_at','desc');
    }
    public function scopeLastBasic($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('action_id', config('controller.action.basic'))
            ->orderBy('created_at','desc');
    }
    public function scopeAllRoomEvent($query, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->where('action_id', config('controller.action.basic'))
            ->whereIn('type_id', [config('controller.b_type.room_in'),config('controller.b_type.room_out')]);
    }
    public function scopeAllBasicEventByStudentID($query, $affiliation_id, $room_id, $student_id, $end_time)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->where('student_id', $student_id)
            ->where('action_id', config('controller.action.basic'))
            ->where('created_at', '<', $end_time);
    }
    public function scopeAllReactionEvent($query, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')]);
    }
    public function scopeAllReactionEventByType($query, $affiliation_id, $room_id, $type_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('type_id', $type_id);
    }

    public function scopeReactionEvent($query, $affiliation_id, $room_id, $type_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('type_id', $type_id);
    }

    public function scopeMessageFromMin($query, $affiliation_id, $room_id, $fromTime)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->whereIn('action_id', [config('controller.action.message_anonymous'),config('controller.action.message_realname')])
            ->where('created_at', '>', $fromTime);
    }
}
