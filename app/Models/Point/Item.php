<?php

namespace App\Models\Point;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
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

	public function shop()
	{
		return $this->belongsTo('App\Models\Point\Shop');
	}
    public function points()
    {
        return $this->hasMany('App\Models\Point\Point');
    }
}

