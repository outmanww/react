<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class CampusFacultySeeder
 */
class CampusFacultySeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('campus_faculty')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM campus_faculty');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE campus_faculty CASCADE');
        }

        $campus = DB::table('campuses')
                ->where('name', '東山キャンパス')
                ->first();

        // seed campus_faculty table
        for($idx=1; $idx<=23; $idx++){

            $faculty = DB::table('faculties')
                ->where('sort', $idx)
                ->first();

            $campus_faculty = [
                'campus_id'       => $campus->id,
                'faculty_id'      => $faculty->id,
                'created_at'      => Carbon::now(),
                'updated_at'      => Carbon::now(),
            ];

            DB::table('campus_faculty')->insert($campus_faculty);
        }

        $campus_tm = DB::table('campuses')
                ->where('name', '鶴舞キャンパス')
                ->first();
        $campus_dk = DB::table('campuses')
                ->where('name', '大幸キャンパス')
                ->first();

        $faculty_md = DB::table('faculties')
                ->where('name', '医学部')
                ->first();
        $faculty_ms = DB::table('faculties')
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

        DB::table('campus_faculty')->insert($campus_faculty_add);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}