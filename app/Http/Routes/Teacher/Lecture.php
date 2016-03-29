<?php

Route::group(['prefix' => 'lectures'], function() {
	Route::get('/', 'LectureController@index');
	Route::get('/list', 'LectureController@index');
	Route::get('/{id}', 'LectureController@index');

	Route::get('/', 'LectureController@index');
	Route::get('/{id}', 'LectureController@index');

});
