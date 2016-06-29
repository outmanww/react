<?php

namespace App\Http\Controllers\Conference;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
//Models
use App\Models\Conference\User;
use App\Models\Conference\Conference;
//Requests
use Illuminate\Http\Request;
//Exceptions
use App\Exceptions\ApiException;

/**
 * Class AudienceController
 */
class AudienceController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        $school = 'conference';

        return view('audience.index', compact('domain', 'env', 'school'));
    }
}
