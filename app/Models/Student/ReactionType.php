<?php

namespace App\Models\Student;

use Illuminate\Database\Eloquent\Model;

class ReactionType extends Model
{
    /**
     * The attributes that are not mass assignable.
     */
    protected $fillable = ['name'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
}
