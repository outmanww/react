<?php

Route::get('', 'AudienceController@index');
Route::get('create/auditor', 'AudienceController@createAuditor');
Route::get('conference', 'AudienceController@conference');
Route::post('messages', 'AudienceController@messages');
Route::post('messages/send', 'AudienceController@sendMessage');

Route::post('messages/like', 'AudienceController@like');
Route::post('messages/dislike', 'AudienceController@dislike');
