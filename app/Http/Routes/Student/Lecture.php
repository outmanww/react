<?php

Route::group(['prefix' => 'lecture'], function() {
	Route::get('/', 'DashboardController@index')->name('teacher.index');
});