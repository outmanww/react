<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Room extends Model
{
	use SoftDeletes;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['lecture_id', 'teacher_id', 'key', 'voice_record', 'length'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'closed_at', 'deleted_at'];

	public function teacher()
	{
		return $this->belongsTo('App\Models\Access\User\User', 'teacher_id', 'id');
	}

	public function lecture()
	{
		return $this->belongsTo('App\Models\Lecture\Lecture');
	}

	public function reactions()
	{
		return $this->hasMany('App\Models\Lecture\Room');
	}
/*
    public function checkRoomKey($key)
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

        $room = $this->where('key', $key)
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
