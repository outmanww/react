<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort'];

	public function faculty()
	{
		return $this->hasMany('App\Models\Lecture\Department');
	}
}