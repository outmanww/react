<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class FacultyTableSeeder extends Seeder
{
    public function run()
    {
        foreach (config('database.schools') as $connection_name) {

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->table(config('access.operation_permission_table'))->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM ' . config('access.operation_permission_table'));
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE ' . config('access.operation_permission_table') . ' CASCADE');
            }

            $faculties = [
                [
                    'name'              => '文学部',
                    'sort'              => '1',
                    'lecture_info_url'  => 'http://syllabus.lit.nagoya-u.ac.jp/',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '教育学部',
                    'sort'              => '2',
                    'lecture_info_url'  => 'http://www.educa.nagoya-u.ac.jp/h28.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '法学部',
                    'sort'              => '3',
                    'lecture_info_url'  => 'https://canvas.law.nagoya-u.ac.jp/pubs/syllabi-latest.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '経済学部',
                    'sort'              => '4',
                    'lecture_info_url'  => 'http://www.soec.nagoya-u.ac.jp/htm/under_gr/school.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '情報文化学部',
                    'sort'              => '5',
                    'lecture_info_url'  => 'http://www.sis.nagoya-u.ac.jp/curriculum/timetable.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '理学部',
                    'sort'              => '6',
                    'lecture_info_url'  => 'https://syllabus.sci.nagoya-u.ac.jp/',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '医学部',
                    'sort'              => '7',
                    'lecture_info_url'  => 'http://www.med.nagoya-u.ac.jp/medical/1804/syllabus01.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '工学部',
                    'sort'              => '8',
                    'lecture_info_url'  => 'http://syllabus.engg.nagoya-u.ac.jp/syllabus/index.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '農学部',
                    'sort'              => '9',
                    'lecture_info_url'  => 'https://www.agr.nagoya-u.ac.jp/agricultural/agc-kougiyouran.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '文学研究科',
                    'sort'              => '10',
                    'lecture_info_url'  => 'http://syllabus.lit.nagoya-u.ac.jp/',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '教育発達科学研究科',
                    'sort'              => '11',
                    'lecture_info_url'  => 'http://www.educa.nagoya-u.ac.jp/h28.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '法学研究科',
                    'sort'              => '12',
                    'lecture_info_url'  => 'https://canvas.law.nagoya-u.ac.jp/pubs/syllabi-latest.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '経済学研究科',
                    'sort'              => '13',
                    'lecture_info_url'  => 'http://www.soec.nagoya-u.ac.jp/htm/graduate/grad_sch.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '理学研究科',
                    'sort'              => '14',
                    'lecture_info_url'  => 'https://syllabus.sci.nagoya-u.ac.jp/',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '医学系研究科',
                    'sort'              => '15',
                    'lecture_info_url'  => 'http://www.med.nagoya-u.ac.jp/medical/1804/syllabus01.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '工学研究科',
                    'sort'              => '16',
                    'lecture_info_url'  => 'http://syllabus.engg.nagoya-u.ac.jp/syllabus/index.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '生命農学研究科',
                    'sort'              => '17',
                    'lecture_info_url'  => 'https://www.agr.nagoya-u.ac.jp/agricultural/agc-kougiyouran.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '国際開発研究科',
                    'sort'              => '18',
                    'lecture_info_url'  => 'http://syllabus3.gsid.nagoya-u.ac.jp/?lang=jp',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '多元数理科学研究科',
                    'sort'              => '19',
                    'lecture_info_url'  => 'https://syllabus.sci.nagoya-u.ac.jp/',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '国際言語文化研究科',
                    'sort'              => '20',
                    'lecture_info_url'  => 'https://www.lang.nagoya-u.ac.jp/schedule.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '環境学研究科',
                    'sort'              => '21',
                    'lecture_info_url'  => 'http://www.env.nagoya-u.ac.jp/education/index.html#syllabus',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '情報科学研究科',
                    'sort'              => '22',
                    'lecture_info_url'  => 'http://www.is.nagoya-u.ac.jp/kyomu/syllabus_list',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '創薬科学研究科',
                    'sort'              => '23',
                    'lecture_info_url'  => 'http://www.ps.nagoya-u.ac.jp/graduate_course/syllabus/',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'name'              => '共通',
                    'sort'              => '24',
                    'lecture_info_url'  => 'http://www.ilas.nagoya-u.ac.jp/~kyoikuin/syllabus/syllabus2016/syllabus-top.html',
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],
            ];

            DB::connection($connection_name)->table('faculties')->insert($faculties);

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}