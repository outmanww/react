<?php

namespace App\Models\Access\User\Traits;

/**
 * Class UserAccess
 * @package App\Models\Access\User\Traits
 */
trait UserLecture
{
    /**
     * Checks if the user has a Lecture by its id.
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
     * Checks if the user has a Room by its id.
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

    /**
     * Checks if the user has a Role by its name or id.
     */
    public function hasActiveRoom()
    {
        $count = $this->rooms->where('closed_at', null)->count();

        if ($count > 0) {
            return true;
        } else {
            return false;
        }

        return false;
    }
}
