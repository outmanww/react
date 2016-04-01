<?php

namespace App\Models\Access\User\Traits;

/**
 * Class UserAccess
 * @package App\Models\Access\User\Traits
 */
trait UserLecture
{
    /**
     * Checks if the user has a Role by its name or id.
     */
    public function hasLecture($id)
    {
        foreach ($this->lectures as $lecture) {
            if ($lecture->id == $id) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if the user has a Role by its name or id.
     */
    public function hasRoom($id)
    {
        foreach ($this->rooms as $room) {
            if ($room->id == $id) {
                return true;
            }
        }

        return false;
    }
}
