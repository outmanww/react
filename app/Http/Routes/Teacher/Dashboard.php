<?php

Route::get('dashboard', 'DashboardController@index')->name('teacher.index');

Route::get('fetch/test', 'DashboardController@test');
