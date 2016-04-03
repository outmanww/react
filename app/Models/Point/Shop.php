<?php

namespace App\Models\Point;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
	use SoftDeletes;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['name', 'sort'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	public function shopType()
	{
		return $this->belongsTo('App\Models\Point\ShopType', 'type_id', 'id');
	}

	public function items()
	{
		return $this->hasMany('App\Models\Point\Item');
	}
}
