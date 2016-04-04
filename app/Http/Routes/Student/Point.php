<?php

Route::group(['prefix' => 'points'], function() {

    Route::group(['middleware' => 'guest'], function () {
    	Route::get('/', 'PointController@point');
    	Route::get('/rooms/{room_key}', 'PointController@roomPoints');
    	Route::post('/use', 'PointController@use');
    });

});