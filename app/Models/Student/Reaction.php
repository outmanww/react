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
    public function scopeInTenMinutes($query, $affiliation_id, $room_id, $type)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->where('type_id', $type)
            ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('created_at', '>', Carbon::now()->subMinutes(10));
    }
    public function scopeFromRoomIn($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('action_id', config('controller.action.basic'))
            ->where('type_id', config('controller.b_type.room_out'))
            ->orderBy('created_at','desc');
    }
    public function scopeFromForeIn($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('affiliation_id', $affiliation_id)
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('action_id', config('controller.action.basic'))
            ->where('type_id', config('controller.b_type.fore_in'))
            ->orderBy('created_at','desc');
    }
    public function calDiffMin(Carbon $room_in)
    {
        $datetime = $this->created_at;
        return $datetime->diffInMinutes($room_in);
    }
}
