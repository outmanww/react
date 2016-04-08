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

    protected $connection;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

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
}
