<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CustomRelations;
use App\Models\Lecture\Department;
use App\Models\Lecture\Campus;

class Faculty extends Model
{
	use SoftDeletes, CustomRelations;

    protected $connection;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort'];

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

	public function departments()
	{
		$department = new Department;
        $department = $department->setConnection($this->connection);
		return $this->CustomHasMany($department);
	}

	public function campuses()
	{
        $campus = new Campus;
        $campus = $campus->setConnection($this->connection);
		return $this->CustomBelongsToMany($campus);
	}
}