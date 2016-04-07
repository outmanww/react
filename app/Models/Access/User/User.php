<?php

namespace App\Models\Access\User;

use App\Models\Access\User\Traits\UserAccess;
use App\Models\Access\User\Traits\UserLecture;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Access\User\Traits\Attribute\UserAttribute;
use App\Models\Access\User\Traits\Relationship\UserRelationship;
use App\Models\CustomRelations;

/**
 * Class User
 * @package App\Models\Access\User
 */
class User extends Authenticatable
{
    use SoftDeletes, UserAccess, UserLecture, UserAttribute, UserRelationship, CustomRelations;

    public function __construct()
    {
        $school = \Request::route('school');
        if (isset($school)) {
            $this->setConnection($school);
        }
    }

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];
}
