<?php

namespace App\Models\Student;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reaction extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'student_id', 'affiliation_id', 'room_id', 'type_id', 'created_at'];
    /**
     * The attributes that are not mass assignable.
     */
//    protected $fillable = ['student_id', 'affiliation_id', 'room_id', 'type_id'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function Student()
	{
		return $this->belongsTo('App\Models\Student\Student');
	}
	public function Affiliation()
	{
		return $this->belongsTo('App\Models\Student\Affiliation');
	}
	public function ReactionType()
	{
		return $this->belongsTo('App\Models\Student\ReactionType');
	}
}
