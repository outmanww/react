<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ShopTableSeeder
 */
class ShopTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('shops')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM shops');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE shops CASCADE');
        }

        // seed shops table
        $shop_type = DB::table('shop_types')
            ->where('name', '飲食')
            ->first();

        $shops = [
            [
                'name'             => 'Starbucks',
                'type_id'          => $shop_type->id,
                'logo_path'        => '/../image/shop/logo/starbucks.png',
                'image_path'       => '/../image/shop/image/starbucks.png',
                'url'              => 'http://www.starbucks.co.jp/',
                'description'      => 'おいしいコーヒー．',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],
            [
                'name'             => 'McDonalds',
                'type_id'          => $shop_type->id,
                'logo_path'        => '/../image/shop/logo/mcdonalds.png',
                'image_path'       => '/../image/shop/image/mcdonalds.png',
                'url'              => 'http://www.mcdonalds.co.jp/',
                'description'      => 'ハンバーガー．',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],
        ];

        DB::table('shops')->insert($shops);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}