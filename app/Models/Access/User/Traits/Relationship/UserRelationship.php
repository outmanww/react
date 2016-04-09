<?php

namespace App\Models\Access\User\Traits\Relationship;

use App\Models\Access\User\SocialLogin;

/**
 * Class UserRelationship
 * @package App\Models\Access\User\Traits\Relationship
 */
trait UserRelationship
{

// CustomHasMany
// CustomBelongsTo
// CustomBelongsToMany

    /**
     * Many-to-Many relations with Role.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        $role_model = new \App\Models\Access\Role\Role;
        $role_model->setConnection($this->connection);

        return $this->CustomBelongsToMany(
            $role_model,
            config('access.role_user_table'),
            'user_id',
            'role_id'
        );
    }

    /**
     * Many-to-Many relations with Permission.
     * ONLY GETS PERMISSIONS ARE NOT ASSOCIATED WITH A ROLE
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions()
    {
        $permission_model = new \App\Models\Access\Permission\Permission;
        $permission_model->setConnection($this->connection);

        return $this->CustomBelongsToMany(
            $permission_model,
            config('access.permission_user_table'),
            'user_id',
            'permission_id'
        );
    }

    /**
     * @return mixed
     */
    public function providers()
    {
        return $this->CustomHasMany(SocialLogin::class);
    }

    /**
     * @return mixed
     */
    public function lectures()
    {
        $lecture_model = new \App\Models\Lecture\Lecture;
        $lecture_model->setConnection($this->connection);

        return $this->CustomBelongsToMany(
            $lecture_model,
            'lecture_teacher',
            'teacher_id',
            'lecture_id'
        );
    }

    /**
     * @return mixed
     */
    public function rooms()
    {
        $room_model = new \App\Models\Lecture\Room;
        $room_model->setConnection($this->connection);

        return $this->CustomHasMany($room_model, 'teacher_id');
    }

    /**
     * @return mixed
     */
    public function department()
    {
        $department_model = new \App\Models\Lecture\Department;
        $department_model->setConnection($this->connection);

        return $this->CustomBelongsTo($department_model);
    }
}
