<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ReactionTypeTableSeeder
 */
class ReactionTypeTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::table('reaction_types')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM reaction_types');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE reaction_types CASCADE');
        }
        
        // seed reaction_types table
        $reaction_types = [
            [
                'id'         => 1,
                'name'       => '基本アクション',
            ],[
                'id'         => 2,
                'name'       => 'リアクトアクション(匿名)',
            ],[
                'id'         => 3,
                'name'       => 'リアクトアクション(実名)',
            ],[
                'id'         => 4,
                'name'       => 'メッセージアクション(匿名)',
            ],[
                'id'         => 5,
                'name'       => 'メッセージアクション(実名)',
            ]
        ];

        DB::table('reaction_types')->insert($reaction_types);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}