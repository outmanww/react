<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class RoomTableSeeder
 */
class RoomTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('rooms')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM rooms');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE rooms CASCADE');
        }
        
        // seed rooms table
        $lecture_1 = DB::table('lectures')
            ->where('sort', 1)
            ->first();
        $lecture_2 = DB::table('lectures')
            ->where('sort', 11)
            ->first();
        $teacher_1 = DB::table('users')
            ->where('family_name', '柳浦')
            ->first();
        $teacher_2 = DB::table('users')
            ->where('family_name', '宮崎')
            ->first();

        $rooms = [
            [
                'lecture_id'       => $lecture_1->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001258',
                'created_at'       => '2015-10-01 13:00:00',
                'closed_at'        => '2015-10-01 14:30:00',
            ],[
                'lecture_id'       => $lecture_1->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001852',
                'created_at'       => '2015-10-08 13:00:00',
                'closed_at'        => '2015-10-08 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001612',
                'created_at'       => '2015-10-02 13:00:00',
                'closed_at'        => '2015-10-02 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001613',
                'created_at'       => '2015-10-09 13:00:00',
                'closed_at'        => '2015-10-09 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001614',
                'created_at'       => '2015-10-16 13:00:00',
                'closed_at'        => '2015-10-16 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001615',
                'created_at'       => '2015-10-23 13:00:00',
                'closed_at'        => '2015-10-23 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001616',
                'created_at'       => '2015-10-30 13:00:00',
                'closed_at'        => '2015-10-30 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001617',
                'created_at'       => '2015-11-07 13:00:00',
                'closed_at'        => '2015-11-07 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001618',
                'created_at'       => '2015-11-14 13:00:00',
                'closed_at'        => '2015-11-14 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001619',
                'created_at'       => '2015-11-21 13:00:00',
                'closed_at'        => '2015-11-21 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001620',
                'created_at'       => '2015-11-28 13:00:00',
                'closed_at'        => '2015-11-28 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001621',
                'created_at'       => '2015-12-05 13:00:00',
                'closed_at'        => '2015-12-05 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001622',
                'created_at'       => '2015-12-19 13:00:00',
                'closed_at'        => '2015-12-19 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001623',
                'created_at'       => '2015-12-26 13:00:00',
                'closed_at'        => '2015-12-26 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001615',
                'created_at'       => '2016-01-16 13:00:00',
                'closed_at'        => '2016-01-16 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_1->id,
                'key'              => '001624',
                'created_at'       => '2015-01-23 13:00:00',
                'closed_at'        => '2015-01-23 14:30:00',
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher_2->id,
                'key'              => '001625',
                'created_at'       => '2015-12-12 13:00:00',
                'closed_at'        => '2015-12-12 14:30:00',
            ]
        ];

        DB::table('rooms')->insert($rooms);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}