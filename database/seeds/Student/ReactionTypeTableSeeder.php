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
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
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
                'name'       => 'リアクトアクション',
            ],[
                'id'         => 3,
                'name'       => 'メッセージアクション',
            ]
        ];

        DB::table('reaction_types')->insert($reaction_types);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}