<?php

/**
 * Frontend Access Controllers
 */
Route::group(['namespace' => 'Auth'], function () {

    /**
     * These routes require the user to be logged in
     */
    Route::group(['middleware' => 'auth:students'], function () {
        Route::get('signout', 'AuthController@logout')->name('auth.logout');

        // Change Password Routes
        // Route::get('/{school}/password/change', 'PasswordController@showChangePasswordForm')->name('auth.password.change');
        // Route::post('/{school}/password/change', 'PasswordController@changePassword')->name('auth.password.update');
    });

    /**
     * These routes require the user NOT be logged in
     */
    Route::group(['middleware' => 'guest:students'], function () {
        // Authentication Routes
        Route::get('signin', 'AuthController@showLoginForm');
        Route::post('signin', 'AuthController@login');

        // Socialite Routes
        Route::get('signin/{provider}', 'AuthController@loginThirdParty');

        // Registration Routes
        Route::get('signup', 'AuthController@showRegistrationForm');
        Route::post('signup', 'AuthController@register');

        // Confirm Account Routes
        Route::get('account/confirm/{token}', 'AuthController@confirmAccount');
        Route::get('/account/confirm/resend/{token}', 'AuthController@resendConfirmationEmail');

        // Password Reset Routes
        // Route::get('password/reset/{token?}', 'PasswordController@showResetForm');
        // Route::post('password/email', 'PasswordController@sendResetLinkEmail');
        // Route::post('password/reset', 'PasswordController@reset');
    });
});