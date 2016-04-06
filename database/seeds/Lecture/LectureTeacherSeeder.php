<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class LectureTeacherSeeder
 */
class LectureTeacherSeeder extends Seeder
{
    protected $connection_list = ['mysql-nagoya-u', 'mysql-toho-u'];

    public function run()
    {
        foreach ($this->connection_list as $connection_name) {

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->table('lecture_teacher')->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM lecture_teacher');
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE lecture_teacher CASCADE');
            }

            // seed lecture_teacher table
            $lecture_1 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '1')
                ->first();
            $lecture_2 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '2')
                ->first();
            $lecture_3 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '3')
                ->first();
            $lecture_4 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '4')
                ->first();
            $lecture_5 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '5')
                ->first();
            $lecture_6 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '6')
                ->first();
            $lecture_7 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '7')
                ->first();
            $lecture_8 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '8')
                ->first();
            $lecture_9 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '9')
                ->first();        
            $lecture_10 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '10')
                ->first();
            $lecture_11 = DB::connection($connection_name)->table('lectures')
                ->where('sort', '11')
                ->first();
            $teacher = DB::connection($connection_name)->table('users')
                ->where('family_name', '柳浦')
                ->first();
            $MK = DB::connection($connection_name)->table('users')
                ->where('family_name', '松下')
                ->first();
            $MZ = DB::connection($connection_name)->table('users')
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

            DB::connection($connection_name)->table('lecture_teacher')->insert($lecture_teacher);

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}