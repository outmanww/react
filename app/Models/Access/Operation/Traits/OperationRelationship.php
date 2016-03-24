<?php

namespace App\Models\Access\Operation\Traits;

/**
 * Class PermissionRelationship
 * @package App\Models\Access\Permission\Traits\Relationship
 */
trait OperationRelationship
{
    /**
     * @return mixed
     */
    public function permission()
    {
        return $this->belongsTo(config('access.permission'));
    }
}