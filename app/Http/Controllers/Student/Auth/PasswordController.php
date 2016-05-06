<?php

namespace App\Http\Controllers\Student\Auth;

use App\Http\Controllers\Controller;
// Requests
use App\Http\Requests\Student\Auth\InitializePasswordRequest;
// Models
use \App\Models\Student\Student;
// Exceptions
use App\Exceptions\ApiException;
// Jobs
use App\Jobs\Student\SendInitializedPasswordEmail;

/**
 * Class PasswordController
 * @package App\Http\Controllers\Frontend\Auth
 */
class PasswordController extends Controller
{
    /**
     * Where to redirect the user after their password has been successfully reset
     *
     * @var string
     */
    protected $redirectTo = '/schools';

    public function initialize(InitializePasswordRequest $request)
    {
        $student = $this->findByEmail($request->email);

        $passsword = substr(base_convert(md5(uniqid()), 16, 36), 0, 8);

        $student->password = bcrypt($passsword);
        $student->save();

        // Queue jobを使ってメール送信
        $this->dispatch(new SendInitializedPasswordEmail($student, $passsword));

        $message = 'initializePassword.success';

        return \Response::json([
            'type' => $message,
            'message' => 'パスワードを初期化しました'
        ], 200);
    }

    /**
     * Get student from email
     */
    public function findByEmail($email) {
        $student = Student::where('email', $email)->first();

        if (!$student instanceof Student) {
            throw new ApiException('email.not_found');
        }

        return $student;
    }
}