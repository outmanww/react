<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faculty extends Model
{
	use SoftDeletes;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function departments()
	{
		return $this->hasMany('App\Models\Lecture\Department');
	}

	public function campuses()
	{
		return $this->belongsToMany('App\Models\Lecture\Campus');
	}
}