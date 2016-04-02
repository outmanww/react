<?php

namespace App\Models\Point;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Point extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function Student()
    {
        return $this->belongsTo('App\Models\Student\Student');
    }
    public function Item()
    {
        return $this->belongsTo('App\Models\Point\Item');
    }
    public function Affiliation()
    {
        return $this->belongsTo('App\Models\Student\Affiliation');
    }

    public function scopeLastRoom($query, $student_id, $affiliation_id, $room_id)
    {
        return $query
            ->where('student_id', $student_id)
            ->where('affiliation_id', $affiliation_id)
            ->where('room_id', $room_id)
            ->orderBy('created_at','desc');
    }
}