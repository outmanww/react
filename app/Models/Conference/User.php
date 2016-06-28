<?php

namespace App\Models\Conference;

//use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at', 'deleted_at'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


    /**
     * @var string
     */
    protected $connection;

    /**
     * set connection from url parameters
     */
    public function __construct()
    {
        $school = 'conference';
        if (isset($school)) {
            $this->setConnection($school);
        }
    }

	public function conferences()
	{
		return $this->hasMany('App\Models\Conference\Conference');
	}
}
