<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
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
}
