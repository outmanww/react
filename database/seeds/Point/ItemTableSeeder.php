<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ItemTableSeeder
 */
class ItemTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('items')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM items');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE items CASCADE');
        }
        
        // seed items table
        $shop_sb = DB::table('shops')
            ->where('name', 'Starbucks')
            ->first();
        $shop_md = DB::table('shops')
            ->where('name', 'McDonalds')
            ->first();
            
        $items = [
            [
                'name'             => 'ドリップ　コーヒー',
                'points'           => 20,
                'shop_id'          => $shop_sb->id,
                'image_path'       => '/../image/item/image/dripcoffee.png',
                'url'              => 'http://www.starbucks.co.jp/beverage/drip/4524785000018/?category=beverage',
                'description'      => '厳選された香り高いドリップコーヒー'
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'name'             => 'ハンバーガー',
                'points'           => 15,
                'shop_id'          => $shop_md->id,
                'image_path'       => '/../image/item/image/hamburger.png',
                'url'              => 'http://www.mcdonalds.co.jp/quality/basic_information/menu_info.php?mid=1010',
                'description'      => 'マクドナルドのおいしさの原点。香ばしく焼き上げられたビーフパティの材料には100%ビーフを使用しています。'
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ]
        ];

        DB::table('items')->insert($items);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}