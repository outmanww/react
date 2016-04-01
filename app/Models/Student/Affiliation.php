<?php

namespace App\Models\Student;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Affiliation extends Model
{
	use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $fillable = ['name'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
}
