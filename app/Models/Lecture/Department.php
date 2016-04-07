<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CustomRelations;
use App\Models\Lecture\Faculty;
use App\Models\Lecture\Lecture;

class Department extends Model
{
	use SoftDeletes, CustomRelations;

    protected $connection = 'connection-name';

    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort', 'faculty_id'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function faculty()
	{
        $facuty = new Faculty;
        $facuty = $facuty->setConnection($this->connection);
		return $this->CustomBelongsTo($facuty);
	}
    public function lectures()
    {
        $lecture = new Lectures;
        $lecture = $lecture->setConnection($this->connection);
        return $this->CustomHasMany($lecture);
    }
}