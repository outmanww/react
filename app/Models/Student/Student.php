<?php

namespace App\Models\Student;

//use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Authenticatable
{
    use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at', 'deleted_at'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function reactions()
	{
		return $this->hasMany('App\Models\Student\Reaction');
	}
    public function points()
    {
        return $this->hasMany('App\Models\Point\Point');
    }
}
