<?php

namespace App\Models\Student;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    /**
     * The attributes that are not mass assignable.
     */
    protected $fillable = ['student_id', 'affiliation_id', 'room_id', 'type_id'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
}
