<?php

namespace App\Http\Controllers\Student;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//Models
use App\Models\Point\ShopType;
use App\Models\Point\Shop;
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
        $shopType = ShopType::find($shop_type_id);
        if (!$shopType instanceof ShopType) {
            throw new ApiException('shop_type.not_found');
        }

        $results = $shopType->shops
                        ->select('id', 'name', 'logo_path', 'image_path')
                        ->get();
                        
        return \Response::json($results, 200);
    }

    // get recomend items by type
    public function recomendItemsByType($shop_type_id)
    {
        $shopType = ShopType::find($shop_type_id);
        if (!$shopType instanceof ShopType) {
            throw new ApiException('shop_type.not_found');
        }
        $results = array();
        $shops = $shopType->shops;
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

    // get shop by id
    public function shopDetail($shop_id)
    {
        $shop = Shop::find($shop_id);
        if (!$shop instanceof Shop) {
            throw new ApiException('shop.not_found');
        }
        return \Response::json($shop, 200);
    }

    // get item by id
    public function itemDetail($item_id)
    {
        $item = Item::find($item_id);
        if (!$item instanceof Item) {
            throw new ApiException('item.not_found');
        }
        return \Response::json($item, 200);
    }

    // get items by shop id
    public function itemsByShopID($shop_id)
    {
        $shop = Shop::find($shop_id);
        if (!$shop instanceof Shop) {
            throw new ApiException('shop.not_found');
        }
        return \Response::json($shop->items, 200);
    }
}
