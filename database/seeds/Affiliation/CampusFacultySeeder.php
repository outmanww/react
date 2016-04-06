<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class CampusFacultySeeder
 */
class CampusFacultySeeder extends Seeder
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

            $campus = DB::connection($connection_name)->table('campuses')
                    ->where('name', '東山キャンパス')
                    ->first();

            // seed campus_faculty table
            for($idx=1; $idx<=23; $idx++){

                $faculty = DB::connection($connection_name)->table('faculties')
                    ->where('sort', $idx)
                    ->first();

                $campus_faculty = [
                    'campus_id'  => $campus->id,
                    'faculty_id' => $faculty->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

                DB::connection($connection_name)->table('campus_faculty')->insert($campus_faculty);
            }

            $campus_tm = DB::connection($connection_name)->table('campuses')
                    ->where('name', '鶴舞キャンパス')
                    ->first();
            $campus_dk = DB::connection($connection_name)->table('campuses')
                    ->where('name', '大幸キャンパス')
                    ->first();

            $faculty_md = DB::connection($connection_name)->table('faculties')
                    ->where('name', '医学部')
                    ->first();
            $faculty_ms = DB::connection($connection_name)->table('faculties')
                    ->where('name', '医学系研究科')
                    ->first();

            $campus_faculty_add = 
            [[
                'campus_id'       => $campus_tm->id,
                'faculty_id'      => $faculty_ms->id,
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ],[
                'campus_id'       => $campus_tm->id,
                'faculty_id'      => $faculty_md->id,
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ],[
                'campus_id'       => $campus_dk->id,
                'faculty_id'      => $faculty_ms->id,
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ],[
                'campus_id'       => $campus_dk->id,
                'faculty_id'      => $faculty_md->id,
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ]];

            DB::connection($connection_name)->table('campus_faculty')->insert($campus_faculty_add);

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}