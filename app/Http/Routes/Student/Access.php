<?php

Route::group(['middleware' => 'auth:students'], function () {
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
    Route::group(['middleware' => 'auth:students'], function () {

        Route::post('user/{student}', function(App\Models\Student\Student $student){
            return $student;
        });

        Route::get('signout', 'AuthController@logout')->name('auth.logout');

        // Change Password Routes
        // Route::get('/{school}/password/change', 'PasswordController@showChangePasswordForm')->name('auth.password.change');
        // Route::post('/{school}/password/change', 'PasswordController@changePassword')->name('auth.password.update');
    });

    /**
     * These routes require the user NOT be logged in
     */
    Route::group(['middleware' => 'guest:students_api'], function () {
        // Route::get('signin', 'AuthController@showSigninForm');
        // Route::get('signin/{provider}', 'AuthController@loginThirdParty');
        Route::post('signin', 'AuthController@signin');

        // Route::get('signup', 'AuthController@showRegistrationForm');
        Route::post('signup', 'AuthController@signup');

        Route::get('account/confirm/{token}', 'AuthController@confirmAccount');
        Route::get('/account/confirm/resend/{token}', 'AuthController@resendConfirmationEmail');

        // Password Reset Routes
        // Route::get('password/reset/{token?}', 'PasswordController@showResetForm');
        // Route::post('password/email', 'PasswordController@sendResetLinkEmail');
        // Route::post('password/reset', 'PasswordController@reset');
    });
});