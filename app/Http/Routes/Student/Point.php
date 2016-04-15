<?php

Route::group(['prefix' => 'points'], function() {

    Route::group(['middleware' => 'auth:students_api'], function () {
    	Route::get('/', 'PointController@point');
    	Route::get('/rooms/{room_key}', 'PointController@roomPoints');
    	Route::post('/use', 'PointController@usePoint');
    });

});