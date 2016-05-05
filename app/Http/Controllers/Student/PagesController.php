<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Point\Point;
use App\Models\Point\Item;
// Exceptions
use App\Exceptions\ApiException;
// Request
use App\Http\Requests\Student\UsePointRequest;
use Carbon\Carbon;

/**
 * Class RoomController
 * @package App\Http\Controllers\Student
 */
class PagesController extends Controller
{
    public function index()
    {
        return view('student.confirmSccess');
    }
}
