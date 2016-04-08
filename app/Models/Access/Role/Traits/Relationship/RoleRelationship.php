<?php

namespace App\Models\Access\Role\Traits\Relationship;

/**
 * Class RoleRelationship
 * @package App\Models\Access\Role\Traits\Relationship
 */
trait RoleRelationship
{
    /**
     * @return mixed
     */
    public function users()
    {
        // return $this->belongsToMany(config('auth.providers.users.model'), config('access.assigned_roles_table'), 'role_id', 'user_id');

        $user_model = new config('auth.providers.users.model');
        $user_model->setConnection($this->connection);

        return $this->customBelongsToMany(
            $user_model,
            config('access.assigned_roles_table'),
            'role_id',
            'user_id'
        );
    }

    /**
     * @return mixed
     */
    public function permissions()
    {
        // return $this->belongsToMany(config('access.permission'), config('access.permission_role_table'), 'role_id', 'permission_id');

        $permission_model = new config('access.permission');
        $permission_model->setConnection($this->connection);

        return $this->customBelongsToMany(
            $permission_model,
            config('access.permission_role_table'),
            'role_id',
            'permission_id'
        );
    }
}
