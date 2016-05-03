<?php

Route::group(['prefix' => 'fetch/room'], function() {
	Route::get('/{id}', 'RoomController@room');
	Route::get('/{id}/close', 'RoomController@room');
});

// Route::group(['prefix' => 'fetch/lectures'], function() {
// 	Route::get('', 'RoomController@lectures');
// 	Route::get('store', 'RoomController@lectures');
// 	Route::get('{id}', 'RoomController@lecture');
// 	Route::put('{id}/update', 'RoomController@update');
// 	Route::patch('{id}/activate', 'RoomController@activate');
// 	Route::patch('{id}/deactivate', 'RoomController@deactivate');
// 	Route::delete('{id}', 'RoomController@destroy');
//     Route::patch('{id}/restore', 'RoomController@restore');
// });
