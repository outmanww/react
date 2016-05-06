<?php

namespace App\Jobs\Student;

use App\Jobs\Job;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Student\Student;

class SendInitializedPasswordEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $student;
    protected $passsword;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Student $student, $passsword)
    {
        $this->student = $student;
        $this->passsword = $passsword;        
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Mailer $mailer)
    {
        $student = $this->student;
        $mailer->send(
            'student.emails.initializedPassword',
            [
                'password' => $this->passsword,
                'name' => $student->family_name.' '.$student->given_name,
                'email' => $student->email,
            ],
            function ($message) use ($student) {
                $message->to($student->email, $student->family_name)
                    ->subject(app_name() . ': パスワードの初期化');
            }
        );
    }
}
