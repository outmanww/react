<?php

/**
 * Frontend Controllers
 */
Route::get('/', 'FrontendController@index')->name('frontend.index');
Route::get('/userPolicy', 'FrontendController@userPolicy')->name('frontend.userPolicy');
Route::get('/privacyPolicy', 'FrontendController@privacyPolicy')->name('frontend.privacyPolicy');
Route::get('/schools', 'FrontendController@schools')->name('frontend.schools');

/**
 * These frontend controllers require the user to be logged in
 */
Route::group(['middleware' => 'auth'], function () {
    Route::group(['namespace' => 'User'], function() {
        Route::get('dashboard', 'DashboardController@index')->name('frontend.user.dashboard');
        Route::get('profile/edit', 'ProfileController@edit')->name('frontend.user.profile.edit');
        Route::patch('profile/update', 'ProfileController@update')->name('frontend.user.profile.update');
    });
});