<?php

/**
 * Frontend Access Controllers
 */
Route::group(['namespace' => 'Auth'], function () {

    /**
     * These routes require the user to be logged in
     */
    Route::group(['middleware' => 'auth'], function () {
        Route::get('/{school}/signout', 'AuthController@logout')->name('auth.logout');

        // Change Password Routes
        Route::get('/{school}/password/change', 'PasswordController@showChangePasswordForm')->name('auth.password.change');
        Route::post('/{school}/password/change', 'PasswordController@changePassword')->name('auth.password.update');
    });

    /**
     * These routes require the user NOT be logged in
     */
    Route::group(['middleware' => 'guest'], function () {
        // Authentication Routes
        Route::get('/{school}/signin', 'AuthController@showLoginForm')->name('auth.login');
        Route::post('/{school}/signin', 'AuthController@login');

        // Socialite Routes
        Route::get('/{school}/signin/{provider}', 'AuthController@loginThirdParty')->name('auth.provider');

        // Registration Routes
        Route::get('/{school}/signup', 'AuthController@showRegistrationForm')->name('auth.register');
        Route::post('/{school}/signup', 'AuthController@register');

        // Confirm Account Routes
        Route::get('/{school}/account/confirm/{token}', 'AuthController@confirmAccount')->name('account.confirm');
        Route::get('/account/confirm/resend/{token}', 'AuthController@resendConfirmationEmail')->name('account.confirm.resend');

        // Password Reset Routes
        Route::get('/{school}/password/reset/{token?}', 'PasswordController@showResetForm')->name('auth.password.reset');
        Route::post('/{school}/password/email', 'PasswordController@sendResetLinkEmail');
        Route::post('/{school}/password/reset', 'PasswordController@reset');
    });
});