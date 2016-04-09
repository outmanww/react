<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ReactionTypeTableSeeder
 */
class SemesterTableSeeder extends Seeder
{
    public function run()
    {
        foreach (config('database.schools') as $connection_name) {

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->table('semesters')->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM semesters');
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE semesters CASCADE');
            }
        
            // seed semesters table
            $semesters = [
                [
                    'id'         => 1,
                    'name'       => '前期',
                ],[
                    'id'         => 2,
                    'name'       => '後期',
                ],[
                    'id'         => 3,
                    'name'       => 'その他',
                ],[
                    'id'         => 4,
                    'name'       => '集中講座',
                ]
            ];

            DB::connection($connection_name)->table('semesters')->insert($semesters);

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}