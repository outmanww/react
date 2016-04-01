<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lecture extends Model
{
	use SoftDeletes;

    /**
     * 複数代入の許可
     */
    protected $guarded = ['id'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function users()
	{
		return $this->belongsToMany('App\Models\Access\User\User', 'lecture_teacher', 'lecture_id', 'teacher_id');
	}

	public function department()
	{
		return $this->belongsTo('App\Models\Lecture\Department');
	}

	public function rooms()
	{
		return $this->hasMany('App\Models\Lecture\Room');
	}
}