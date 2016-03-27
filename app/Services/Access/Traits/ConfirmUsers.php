<?php

namespace App\Services\Access\Traits;

/**
 * Class ConfirmUsers
 * @package App\Services\Access\Traits
 */
trait ConfirmUsers
{

    /**
     * Confirms the users account by their token
     *
     * @param $token
     * @return mixed
     */
    public function confirmAccount($school, $token)
    {
        $this->user->confirmAccount($token);
        return redirect()->route('auth.login')->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.success'));
    }

    /**
     * @param $token
     * @return mixed
     */
    public function resendConfirmationEmail($school, $token)
    {
        $this->user->resendConfirmationEmail($token);
        return redirect()->route('auth.login')->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.resent'));
    }
}