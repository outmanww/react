<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CustomRelations;
use App\Models\Lecture\Lecture;

class Semester extends Model
{
	use SoftDeletes;

    protected $connection;

    /**
     * The attributes that are not mass assignable.
     */
    protected $fillable = ['name'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * set connection from url parameters
     */
    public function __construct()
    {
        $school = \Request::route('school');
        if (isset($school)) {
            $this->setConnection($school);
        }
    }

    public function lectures()
    {
        $lecture = new Lecture;
        $lecture = $lecture->setConnection($this->connection);
        return $this->CustomHasMany($lecture);
    }
}
