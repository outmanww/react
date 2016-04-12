<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CustomRelations;
use App\Models\Lecture\Faculty;

class campus extends Model
{
	use SoftDeletes, CustomRelations;

    protected $connection;
    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort', 'geo_long', 'geo_lat', 'range'];

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

	public function faculties()
	{
        $facuty = new Faculty;
        $facuty = $facuty->setConnection($this->connection);
		return $this->CustomBelongsToMany($facuty);
	}
}