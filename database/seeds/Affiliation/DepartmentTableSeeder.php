<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class DepartmentTableSeeder extends Seeder
{
    protected $connection_list = ['mysql-nagoya-u', 'mysql-toho-u'];

    public function run()
    {
        foreach ($this->connection_list as $connection_name) {
            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->table(config('access.operation_permission_table'))->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM ' . config('access.operation_permission_table'));
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE ' . config('access.operation_permission_table') . ' CASCADE');
            }

            /**
             * 文学部のコース
             * 生涯教育開発 学校教育情報 国際社会文化 心理社会行動 発達教育臨床
             */
            $faculties = DB::connection($connection_name)->table('faculties')
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

            DB::connection($connection_name)->table('departments')->insert($departments);

            /**
             * 教育学部のコース
             * 生涯教育開発 学校教育情報 国際社会文化 心理社会行動 発達教育臨床
             */
            $faculties = DB::connection($connection_name)->table('faculties')
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

            DB::connection($connection_name)->table('departments')->insert($departments);
            /**
             * 情報文化学部のコース
             */
            $faculties = DB::connection($connection_name)->table('faculties')
                ->where('name', '情報文化学部')
                ->first();

            $departments = [
                [
                    'name'       => '複雑システム系',
                    'sort'       => '1',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],[
                    'name'       => '数理情報系',
                    'sort'       => '2',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],[
                    'name'       => '環境システム系',
                    'sort'       => '3',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],[
                    'name'       => '環境法経システム系',
                    'sort'       => '4',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],[
                    'name'       => '社会地域環境系',
                    'sort'       => '5',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],[
                    'name'       => 'メディア社会系',
                    'sort'       => '6',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],[
                    'name'       => '共通',
                    'sort'       => '7',
                    'faculty_id' => $faculties->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]
            ];

            DB::connection($connection_name)->table('departments')->insert($departments);

            if (env('DB_CONNECTION') == 'mysql') {
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}