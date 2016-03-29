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

	public function user()
	{
		return $this->belongsToMany('App\Models\Access\User\User');
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
