<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort'];

	public function faculty()
	{
		return $this->belongsTo('App\Models\Lecture\Faculty');
	}
}