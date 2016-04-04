<?php

namespace App\Models\Point;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopType extends Model
{
	use SoftDeletes;
    /**
     * The attributes that are not mass assignable.
     */
    protected $fillable = ['name'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function shops()
	{
		return $this->hasMany('App\Models\Point\Shop','type_id','id');
	}
}
