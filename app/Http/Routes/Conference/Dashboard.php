<?php

Route::get('dashboard', 'DashboardController@index');
Route::get('student', 'DashboardController@index');

Route::get('fetch/test', 'DashboardController@test');
Route::get('fetch/messages', 'DashboardController@message');
Route::get('fetch/now', 'DashboardController@now');

Route::get('fetch/test2', 'DashboardController@test2');
