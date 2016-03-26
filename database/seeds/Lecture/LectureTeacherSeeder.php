<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class LectureTeacherSeeder
 */
class LectureTeacherSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('lecture_teacher')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM lecture_teacher');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE lecture_teacher CASCADE');
        }

        // seed lecture_teacher table
        $lecture_1 = DB::table('lectures')
            ->where('title', '線形代数')
            ->first();
        $lecture_2 = DB::table('lectures')
            ->where('title', '犯罪心理学')
            ->first();
        $teacher = DB::table('users')
            ->where('family_name', 'Teacher')
            ->first();
        $lecture_teacher = [
            [
                'lecture_id'       => $lecture_1->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_2->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ]
        ];

        DB::table('lecture_teacher')->insert($lecture_teacher);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}