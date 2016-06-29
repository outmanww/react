<?php

Route::group(['namespace' => 'Student', 'prefix' => 'student'], function() {
    /*
     * Student Routes
     */
    require (__DIR__ . '/Routes/Student/Access.php');
    // require (__DIR__ . '/Routes/Student/Pages.php');
    require (__DIR__ . '/Routes/Student/Room.php');
    require (__DIR__ . '/Routes/Student/Point.php');
    require (__DIR__ . '/Routes/Student/Shopping.php');
});


Route::group(['middleware' => 'web'], function() {
    /*
     * Switch between the included languages
     */
    Route::group(['namespace' => 'Language'], function () {
        require (__DIR__ . '/Routes/Language/Language.php');
    });

    /*
     * Frontend Routes
     * Namespaces indicate folder structure
     */
    Route::group(['namespace' => 'Frontend'], function () {
        require (__DIR__ . '/Routes/Frontend/Frontend.php');
        require (__DIR__ . '/Routes/Frontend/Access.php');
    });
});

/**
 * Backend Routes
 * Namespaces indicate folder structure
 * Admin middleware groups web, auth, and routeNeedsPermission
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'middleware' => 'admin'], function () {
    /**
     * These routes need view-backend permission
     * (good if you want to allow more than one group in the backend,
     * then limit the backend features by different roles or permissions)
     *
     * Note: Administrator has all permissions so you do not have to specify the administrator role everywhere.
     */
    require (__DIR__ . '/Routes/Backend/Dashboard.php');
    require (__DIR__ . '/Routes/Backend/Access.php');
    require (__DIR__ . '/Routes/Backend/LogViewer.php');
});

/**
 * Conference Routes
 */
Route::group(['namespace' => 'Conference', 'prefix' => '/conference'], function () {

    Route::group(['prefix' => 'audience'], function () {
        require (__DIR__ . '/Routes/Conference/Audience.php');
    });

    Route::group(['prefix' => 'teacher'], function () {
        require (__DIR__ . '/Routes/Conference/Dashboard.php');
        require (__DIR__ . '/Routes/Conference/Lecture.php');
        require (__DIR__ . '/Routes/Conference/Room.php');
        require (__DIR__ . '/Routes/Conference/User.php');
    });
});

/**
 * Teacher Routes
 */
Route::group(['namespace' => 'Teacher', 'prefix' => '/{school}/teacher', 'middleware' => 'teacher'], function () {

    require (__DIR__ . '/Routes/Teacher/Dashboard.php');
    require (__DIR__ . '/Routes/Teacher/Lecture.php');
    require (__DIR__ . '/Routes/Teacher/Room.php');
    require (__DIR__ . '/Routes/Teacher/User.php');
});
