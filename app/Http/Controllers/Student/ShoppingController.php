<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Point\ShopType;
use App\Models\Point\Shop;
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
        $results = Item::where('is_recommend', true)
                        ->select('id', 'name', 'point', 'image_path')
                        ->get();
        return \Response::json($results, 200);
    }
    public function shopsByType($shop_type_id)
    {
        $results = Shop::where('type_id', $shop_type_id)
                        ->select('id', 'name', 'logo_path', 'image_path')
                        ->get();
        return \Response::json($results, 200);
    }
    public function recomendItemsByType($shop_type_id)
    {
        $results = array();
        $shops = ShopType::where('id',$shop_type_id)->get();
        foreach($shops as $shop){

            $items = Item::where('shop_id', $shop->id)
                ->where('is_recommend', true)
                ->select('id', 'name', 'point', 'image_path')
                ->get();
            foreach($items as $item){
                array_push($results, $item);
            }
        }
        return \Response::json($results, 200);
    }
    public function shopDetail($shop_id)
    {
        return \Response::json(Shop::findOrFail($shop_id), 200);
    }
    public function itemDetail($item_id)
    {

        return \Response::json(Item::findOrFail($item_id), 200);
    }
    public function itemsByShopID($shop_id)
    {
        return \Response::json(Shop::findOrFail($shop_id)->items, 200);
    }
}
