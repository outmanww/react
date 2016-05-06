<?php

Route::group(['middleware' => 'auth:students_api'], function () {
    Route::post('user', function(){
        return \Auth::guard('students')->user();
    });
});

/**
 * Frontend Access Controllers
 */
Route::group(['namespace' => 'Auth'], function () {

    /**
     * These routes require the user to be logged in
     */
    Route::group(['middleware' => 'auth:students_api'], function () {

        Route::post('user/{student}', function(App\Models\Student\Student $student){
            return $student;
        });

        Route::post('signout', 'AuthController@signout');
        Route::get('apitoken', 'AuthController@apitoken');

        Route::get('confirm/resend', 'AuthController@resendConfirmationEmail');

        // Change Password Routes
        // Route::get('/{school}/password/change', 'PasswordController@showChangePasswordForm')->name('auth.password.change');
        // Route::post('/{school}/password/change', 'PasswordController@changePassword')->name('auth.password.update');
    });

    /**
     * These routes require the user NOT be logged in
     */
    Route::group(['middleware' => 'guest:students_api'], function () {
        // Route::get('signin/{provider}', 'AuthController@loginThirdParty');
        Route::post('signin', 'AuthController@signin');
        Route::post('signup', 'AuthController@signup');

        Route::get('confirm/success', 'AuthController@confirmSuccess');
        Route::get('confirm/{token}', 'AuthController@confirmAccount');

        // Password
        Route::post('password/email', 'PasswordController@initialize');
    });
});