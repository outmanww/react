<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class AffiliationTableSeeder
 */
class AffiliationTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::table('affiliations')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM affiliations');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE affiliations CASCADE');
        }

        $affiliations = [
            [
                'db_name'          => 'nagoya-u',
                'name'             => '名古屋大学',
                'logo_path'        => '/../image/school/logo/nagoya-u.png',
                'image_path'       => '/../image/school/image/nagoya-u.png',
                'url'              => 'http://www.nagoya-u.ac.jp/',
                'description'      => '東海一流の国立大学です．',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],
            [
                'db_name'          => 'aichitoho-u',
                'name'             => '愛知東邦大学',
                'logo_path'        => '/../image/school/logo/toho-u.png',
                'image_path'       => '/../image/school/image/toho-u.png',
                'url'              => 'http://www.toho-u.ac.jp/',
                'description'      => '東海の私立大学です．',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],
        ];

        DB::table('affiliations')->insert($affiliations);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}