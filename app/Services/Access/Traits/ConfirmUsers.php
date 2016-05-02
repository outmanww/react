<?php

namespace App\Services\Access\Traits;
// Jobs
use App\Jobs\Teacher\ResendConfirmationEmail;

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
        return redirect()->route('auth.login', [$school])
            ->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.success'));
    }

    /**
     * @param $token
     * @return mixed
     */
    public function resendConfirmationEmail($school, $token)
    {
        $user = $this->user->findByToken($token);
        $this->dispatch(new ResendConfirmationEmail($user));

        return redirect()->route('auth.login', [$school])
            ->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.resent'));
    }
}