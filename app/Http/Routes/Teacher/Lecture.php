<?php
Route::group(['prefix' => 'lectures'], function() {
	Route::get('/', 'LectureController@index');
	Route::get('/list', 'LectureController@index');
	Route::get('/{id}', 'LectureController@index');
	Route::get('/{id}/create', 'LectureController@index');
	Route::get('/{id}/edit', 'LectureController@index');
});

Route::group(['prefix' => 'room'], function() {
	Route::get('/{id}', 'LectureController@index');
	Route::get('/{id}/edit', 'LectureController@index');
});

Route::group(['prefix' => 'fetch/lectures'], function() {
	Route::get('', 'LectureController@lectures');
	Route::get('basic', 'LectureController@basic');
	Route::post('search', 'LectureController@search');
	Route::get('store', 'LectureController@store');
	Route::get('{id}', 'LectureController@lecture');
	Route::put('{id}/update', 'LectureController@update');
	Route::patch('{id}/activate', 'LectureController@activate');
	Route::patch('{id}/deactivate', 'LectureController@deactivate');
	Route::delete('{id}', 'LectureController@destroy');
    Route::patch('{id}/restore', 'LectureController@restore');
});
