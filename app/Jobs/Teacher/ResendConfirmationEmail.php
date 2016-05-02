<?php

namespace App\Jobs\Teacher;

use App\Jobs\Job;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Access\User\User;

class ResendConfirmationEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Mailer $mailer)
    {
        $user = $this->user;
        $mailer->send(
            'teacher.emails.resend',
            [
                'token' => $user->confirmation_code,
                'name' => $user->family_name.' '.$user->given_name,
                'email' => $user->email,
                'school' => \Request::route('school')
            ],
            function ($message) use ($user) {
                $message->to($user->email, $user->family_name)->subject(app_name() . ': メールの確認');
            }
        );
    }
}
