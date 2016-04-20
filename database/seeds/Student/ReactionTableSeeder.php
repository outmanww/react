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
        $nagoya_u = DB::table('affiliations')
            ->where('name', '名古屋大学')
            ->first();

        $active_room = DB::connection($nagoya_u->db_name)
            ->table('rooms')
            ->where('closed_at', null)
            ->first();

        $student_ids = DB::table('students')
            ->lists('id');

        $reactions = [];

        foreach ($student_ids as $key => $student_id) {
            $rand_enter = mt_rand(80, 89);

            array_push($reactions,
                [
                    'student_id'       => $student_id,
                    'affiliation_id'   => $nagoya_u->id,
                    'room_id'          => $active_room->id,
                    'action_id'        => 1,
                    'type_id'          => 1,
                    'message'          => null,
                    'created_at'       => Carbon::now()->subMinutes($rand_enter)
                ],[
                    'student_id'       => $student_id,
                    'affiliation_id'   => $nagoya_u->id,
                    'room_id'          => $active_room->id,
                    'action_id'        => 2,
                    'type_id'          => mt_rand(1, 3),
                    'message'          => null,
                    'created_at'       => Carbon::now()->subMinutes($rand_enter - 5)
                ],[
                    'student_id'       => $student_id,
                    'affiliation_id'   => $nagoya_u->id,
                    'room_id'          => $active_room->id,
                    'action_id'        => 2,
                    'type_id'          => mt_rand(1, 3),
                    'message'          => null,
                    'created_at'       => Carbon::now()->subMinutes($rand_enter - 7)
                ]
            );
        }

        for ($i=0; $i < 200; $i++) {
            $keyArray = array_rand($student_ids, 1);
            $reactions[] = [
                'student_id'       => $student_ids[$keyArray],
                'affiliation_id'   => $nagoya_u->id,
                'room_id'          => $active_room->id,
                'action_id'        => 2,
                'type_id'          => mt_rand(1, 3),
                'message'          => null,
                'created_at'       => Carbon::now()->subMinutes(mt_rand(1, 79))
            ];
        }

        for ($i=0; $i < 30; $i++) {
            $keyArray = array_rand($student_ids, 1);
            $reactions[] = [
                'student_id'       => $student_ids[$keyArray],
                'affiliation_id'   => $nagoya_u->id,
                'room_id'          => $active_room->id,
                'action_id'        => 3,
                'type_id'          => mt_rand(1, 3),
                'message'          => 'ダミーメッセージ',
                'created_at'       => Carbon::now()->subMinutes(mt_rand(1, 79))
            ];
        }

        // $student_1 = DB::table('students')
        //     ->where('family_name', '山田')
        //     ->first();
        // $student_2 = DB::table('students')
        //     ->where('family_name', '鈴木')
        //     ->first();

        // $reactions = [
        //     [
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 1,
        //         'type_id'          => 1,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 2,
        //         'type_id'          => 1,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 2,
        //         'type_id'          => 2,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 3,
        //         'type_id'          => 1,
        //         'message'          => 'p２３の微分の式がわからない',
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 1,
        //         'type_id'          => 3,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 1,
        //         'type_id'          => 4,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_1->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 1,
        //         'type_id'          => 2,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ],[
        //         'student_id'       => $student_2->id,
        //         'affiliation_id'   => $nagoya_u->id,
        //         'room_id'          => 1,
        //         'action_id'        => 1,
        //         'type_id'          => 1,
        //         'message'          => null,
        //         'created_at'       => Carbon::now(),
        //     ]
        // ];

        DB::table('reactions')->insert($reactions);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}