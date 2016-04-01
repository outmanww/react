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
}
