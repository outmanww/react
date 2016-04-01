<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class CampusTableSeeder
 */
class CampusTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('campuses')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM campuses');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE campuses CASCADE');
        }

        $campuses = [
            [
                'name'       => '東山キャンパス',
                'sort'       => '1',
                'geo_lat'    => 35.153644,
                'geo_long'   => 136.968755,
                'range'      => 1500,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '鶴舞キャンパス',
                'sort'       => '2',
                'geo_lat'    => 35.158442,
                'geo_long'   => 136.921433,
                'range'      => 500,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '大幸キャンパス',
                'sort'       => '3',
                'geo_lat'    => 35.189103,
                'geo_long'   => 136.950132,
                'range'      => 500,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];

        DB::table('campuses')->insert($campuses);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}