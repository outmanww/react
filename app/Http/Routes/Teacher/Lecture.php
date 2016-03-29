<?php

Route::group(['prefix' => 'lectures'], function() {
	Route::get('/', 'LectureController@index');
	Route::get('/list', 'LectureController@index');
	Route::get('/{id}', 'LectureController@index');
	Route::get('/{id}/edit', 'LectureController@index');
});

Route::group(['prefix' => 'room'], function() {
	Route::get('/{id}', 'LectureController@index');
	Route::get('/{id}/edit', 'LectureController@index');
});

Route::group(['prefix' => 'fetch'], function() {
	Route::get('lectures', 'LectureController@lectures');
	Route::get('lectures/store', 'LectureController@lectures');
	Route::get('lectures/{id}', 'LectureController@lecture');
	Route::put('lectures/{id}/update', 'LectureController@update');
	Route::patch('lectures/{id}/activate', 'LectureController@activate');
	Route::patch('lectures/{id}/deactivate', 'LectureController@deactivate');
	Route::delete('lectures/{id}', 'LectureController@destroy');
    Route::patch('lectures/{id}/restore', 'LectureController@restore');
});
