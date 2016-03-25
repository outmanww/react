<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class DepartmentTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('departments')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM departments');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE departments CASCADE');
        }

        /**
         * 文学部のコース
         * 生涯教育開発 学校教育情報 国際社会文化 心理社会行動 発達教育臨床
         */
        $faculties = DB::table('faculties')
            ->where('name', '文学部')
            ->first();

        $departments = [
            [
                'name'       => '共通',
                'sort'       => '1',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];

        DB::table('departments')->insert($departments);

        /**
         * 教育学部のコース
         * 生涯教育開発 学校教育情報 国際社会文化 心理社会行動 発達教育臨床
         */
        $faculties = DB::table('faculties')
            ->where('name', '教育学部')
            ->first();

        $departments = [
            [
                'name'       => '生涯教育開発',
                'sort'       => '1',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],[
                'name'       => '学校教育情報',
                'sort'       => '2',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],[
                'name'       => '国際社会文化',
                'sort'       => '3',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],[
                'name'       => '心理社会行動',
                'sort'       => '4',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],[
                'name'       => '発達教育臨床',
                'sort'       => '5',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],[
                'name'       => '共通',
                'sort'       => '6',
                'faculty_id' => $faculties->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];

        DB::table('departments')->insert($departments);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}