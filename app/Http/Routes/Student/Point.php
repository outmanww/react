<?php

Route::group(['prefix' => 'points'], function() {

    Route::group(['middleware' => 'guest'], function () {
    	Route::get('/', 'RoomController@point');
    });

});