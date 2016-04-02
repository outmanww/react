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
    protected $guarded = ['id', 'student_id', 'affiliation_id', 'room_id', 'type_id', 'created_at'];
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
    public function scopeInTenMinutes($query, $room_id, $type)
    {
        return $query
            ->where('room_id', $room_id)
            ->where('action_id', 2)
            ->where('type_id', $type)
            ->where('created_at', '>', Carbon::now()->subMinutes(10));
    }
    public function scopeFromRoomIn($query, $student_id, $room_id)
    {
        return $query
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('type_id', 1)
            ->orderBy('created_at','desc');
    }
    public function scopeFromForeground($query, $student_id, $room_id)
    {
        return $query
            ->where('student_id', $student_id)
            ->where('room_id', $room_id)
            ->where('type_id', 4)
            ->orderBy('created_at','desc');
    }
}
