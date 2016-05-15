<?php

Route::get('dashboard', 'DashboardController@index')->name('teacher.index');
Route::get('student', 'DashboardController@index')->name('teacher.index');

Route::get('fetch/test', 'DashboardController@test');
Route::get('fetch/messages', 'DashboardController@message');
Route::get('fetch/now', 'DashboardController@now');
