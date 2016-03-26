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
            ->where('title', '線形代数')
            ->first();
        $lecture_2 = DB::table('lectures')
            ->where('title', '犯罪心理学')
            ->first();
        $teacher = DB::table('users')
            ->where('family_name', 'Teacher')
            ->first();
        $rooms = [
            [
                'lecture_id'       => $lecture_1->id,
                'teacher_id'       => $teacher->id,
                'key'              => '147258',
                'created_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_1->id,
                'teacher_id'       => $teacher->id,
                'key'              => '163852',
                'created_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher->id,
                'key'              => '854612',
                'created_at'       => Carbon::now(),
            ]
        ];

        DB::table('rooms')->insert($rooms);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}