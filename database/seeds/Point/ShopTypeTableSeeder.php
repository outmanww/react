<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ShopTypeTableSeeder
 */
class ShopTypeTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::table('shop_types')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM shop_types');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE shop_types CASCADE');
        }
        
        // seed shop_types table
        $shop_types = [
            [
                'name'             => '飲食',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'name'             => 'ファッション',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'name'             => 'その他',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ]
        ];

        DB::table('shop_types')->insert($shop_types);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}