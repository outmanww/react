<?php

namespace App\Models\Student;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function reactions()
	{
		return $this->hasMany('App\Models\Student\Reaction');
	}
}
