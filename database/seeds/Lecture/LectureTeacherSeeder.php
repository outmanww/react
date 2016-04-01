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
            ->where('sort', '1')
            ->first();
        $lecture_2 = DB::table('lectures')
            ->where('sort', '2')
            ->first();
        $lecture_3 = DB::table('lectures')
            ->where('sort', '3')
            ->first();
        $lecture_4 = DB::table('lectures')
            ->where('sort', '4')
            ->first();
        $lecture_5 = DB::table('lectures')
            ->where('sort', '5')
            ->first();
        $lecture_6 = DB::table('lectures')
            ->where('sort', '6')
            ->first();
        $lecture_7 = DB::table('lectures')
            ->where('sort', '7')
            ->first();
        $lecture_8 = DB::table('lectures')
            ->where('sort', '8')
            ->first();
        $lecture_9 = DB::table('lectures')
            ->where('sort', '9')
            ->first();        
        $lecture_10 = DB::table('lectures')
            ->where('sort', '10')
            ->first();
        $lecture_11 = DB::table('lectures')
            ->where('sort', '11')
            ->first();
        $teacher = DB::table('users')
            ->where('family_name', '柳浦')
            ->first();
        $MK = DB::table('users')
            ->where('family_name', '松下')
            ->first();
        $MZ = DB::table('users')
            ->where('family_name', '宮崎')
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
            ],[
                'lecture_id'       => $lecture_3->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_4->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_5->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_6->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_7->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_8->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_9->id,
                'teacher_id'       => $teacher->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_1->id,
                'teacher_id'       => $MK->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_10->id,
                'teacher_id'       => $MK->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_11->id,
                'teacher_id'       => $MZ->id,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'lecture_id'       => $lecture_11->id,
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