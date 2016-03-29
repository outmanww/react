<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
	use SoftDeletes;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort'];

	public function faculty()
	{
		return $this->belongsTo('App\Models\Lecture\Faculty');
	}
}