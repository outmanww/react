<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ReactionTableSeeder
 */
class ReactionTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::table('reactions')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM reactions');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE reactions CASCADE');
        }
        
        // seed reactions table
        $affiliation = DB::table('affiliations')
            ->where('name', '名古屋大学')
            ->first();
        $student_1 = DB::table('students')
            ->where('family_name', '山田')
            ->first();
        $student_2 = DB::table('students')
            ->where('family_name', '鈴木')
            ->first();
            
        $reactions = [
            [
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 1,
                'type_id'          => 1,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 2,
                'type_id'          => 1,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 2,
                'type_id'          => 2,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 3,
                'type_id'          => 1,
                'message'          => 'p２３の微分の式がわからない',
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 1,
                'type_id'          => 3,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 1,
                'type_id'          => 4,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 1,
                'type_id'          => 2,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_2->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'action_id'        => 1,
                'type_id'          => 1,
                'message'          => null,
                'created_at'       => Carbon::now(),
            ]
        ];

        DB::table('reactions')->insert($reactions);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}