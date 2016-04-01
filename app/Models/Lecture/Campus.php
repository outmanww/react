<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class campus extends Model
{
	use SoftDeletes;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort', 'geo_long', 'geo_lat', 'range'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function faculties()
	{
		return $this->belongsToMany('App\Models\Lecture\Faculty');
	}
}