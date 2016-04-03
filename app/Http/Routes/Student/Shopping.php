<?php

Route::group(['prefix' => 'shopping'], function() {
    Route::group(['middleware' => 'guest'], function () {
    	Route::get('/recommend-items', 'ShoppingController@recomendItems');
    	Route::get('/shop-types/{shop_type_id}', 'ShoppingController@shopsByType');
    	Route::get('/shop-types/{shop_type_id}/recommend-items/', 'ShoppingController@recomendItemsByType');
    	Route::get('/shops/{shop_id}', 'ShoppingController@shopDetail');
    	Route::get('/items/{item_id}', 'ShoppingController@itemDetail');
    	Route::get('/shops/{shop_id}/items', 'ShoppingController@itemsByShopID');
    });
});