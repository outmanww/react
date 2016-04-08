<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CustomRelations;
use App\Models\Access\User\User;
use App\Models\Lecture\Department;
use App\Models\Lecture\Room;

class Lecture extends Model
{
	use SoftDeletes, CustomRelations;

    protected $connection;

    /**
     * 複数代入の許可
     */
    protected $guarded = ['id'];

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

	public function users()
	{
		$user = new User;
        $user = $user->setConnection($this->connection);
		return $this->CustomBelongsToMany($user, 'lecture_teacher', 'lecture_id', 'teacher_id');
	}

	public function department()
	{
		$department = new Department;
        $department = $department->setConnection($this->connection);
		return $this->CustomBelongsTo($department);
	}

	public function rooms()
	{
		$room = new Room;
        $room = $room->setConnection($this->connection);
		return $this->CustomHasMany($room);
	}
}