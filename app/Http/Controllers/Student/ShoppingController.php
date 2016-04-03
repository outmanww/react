<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Point\Point;
use App\Models\Point\Item;
use App\Models\Student\Student;
// Exceptions
use App\Exceptions\ApiException;
// Request
use App\Http\Requests\Student\UsePointRequest;
use Carbon\Carbon;

/**
 * Class RoomController
 * @package App\Http\Controllers\Student
 */
class ShoppingController extends Controller
{
    /**
     * @return Response
     */
    public function recomendItems()
    {
        return \Response::json('OK', 200);
    }
    public function shopsByType($shop_type_id)
    {
        return \Response::json($shop_type_id, 200);
    }
    public function recomendItemsByType($shop_type_id)
    {
        return \Response::json($shop_type_id, 200);
    }
    public function shopDetail($shop_id)
    {
        return \Response::json($shop_id, 200);
    }
    public function itemDetail($item_id)
    {
        return \Response::json($item_id, 200);
    }
    public function itemsByShopID($shop_id)
    {
        return \Response::json($shop_id, 200);
    }
}
