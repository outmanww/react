<?php

Route::group(['prefix' => 'rooms'], function() {
	/**
	 * Student Controllers
	 */
    Route::group(['middleware' => 'auth:students_api'], function () {
    	Route::get('/{room_key}', 'RoomController@room');
    	Route::post('/{room_key}', 'RoomController@action');
    	Route::get('/{room_key}/status', 'RoomController@status');
    });

	/**
	 * Frontend Access Controllers
	 */
	// Route::group(['namespace' => 'Auth'], function () {

    // });
});