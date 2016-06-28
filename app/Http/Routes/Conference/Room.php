<?php

Route::group(['prefix' => 'fetch/room'], function() {
	Route::get('/{id}', 'RoomController@room');
	Route::patch('/{id}/close', 'RoomController@closeRoom');
});
