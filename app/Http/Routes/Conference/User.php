<?php

Route::group(['prefix' => 'user'], function() {
	Route::get('/', 'UserController@index');
});

Route::group(['prefix' => 'fetch/user'], function() {
	Route::get('info', 'UserController@info');
	Route::get('profile', 'UserController@profile');
	Route::get('profile/update', 'UserController@index');
});
