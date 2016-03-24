<?php

namespace App\Models\Access\Operation;

use Illuminate\Database\Eloquent\Model;
use App\Models\Access\Operation\Traits\OperationRelationship;

/**
 * Class Operation
 * @package App\Models\Access\Operation
 */
class Operation extends Model
{
    use OperationRelationship;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}