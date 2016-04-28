<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class FrontendController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('frontend.index');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function userPolicy()
    {
        return view('frontend.pages.userPolicy');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function privacyPolicy()
    {
        return view('frontend.pages.privacyPolicy');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function schools()
    {
        return view('frontend.schools.index');
    }

    public function test()
    {
        return trans('exceptions.room.not_found');
    }
}
