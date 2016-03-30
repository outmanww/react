<?php

Route::group(['prefix' => 'fetch/user'], function() {
	Route::get('info', 'UserController@info');
	Route::get('profile', 'UserController@profile');
	Route::get('profile/update', 'UserController@index');
});
