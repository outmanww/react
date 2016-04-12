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
    protected $fillable = ['name', 'sort', 'geo_long', 'geo_lat'];

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

    public function inside($lat, $long)
    {
        $isInside = false;

        $latArray = explode(',', $this->geo_lat);
        $longArray = explode(',', $this->geo_long);
        $polySides = count($latArray);
        $j = $polySides-1;
        
        for ($i=0; $i<$polySides; $i++) {
            if ($latArray[$i]<$lat && $latArray[$j]>=$lat
            ||  $latArray[$j]<$lat && $latArray[$i]>=$lat) {
                if ($longArray[$i]+($lat-$latArray[$i])/($latArray[$j]-$latArray[$i])*($longArray[$j]-$longArray[$i])<$long)
                    $isInside=!$isInside;
            }
            $j=$i;
        }

        return $isInside;
    }
}