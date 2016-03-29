<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    /**
     * 複数代入の許可
     */
    protected $fillable = ['lecture_id', 'teacher_id', 'key', 'voice_record', 'length'];

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

	public function user()
	{
		return $this->belongsToMany('App\Models\Access\User\User');
	}

	public function rooms()
	{
		return $this->hasMany('App\Models\Lecture\Room');
	}
}