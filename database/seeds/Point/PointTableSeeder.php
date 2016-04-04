<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class PointTableSeeder
 */
class PointTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('points')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM points');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE points CASCADE');
        }
        
        // seed reactions table
        $affiliation = DB::table('affiliations')
            ->where('name', '名古屋大学')
            ->first();
        $student_1 = DB::table('students')
            ->where('family_name', '山田')
            ->first();
        $student_2 = DB::table('students')
            ->where('family_name', '鈴木')
            ->first();
        $item_1 = DB::table('items')
            ->where('name', 'ドリップ　コーヒー')
            ->first();
        $item_2 = DB::table('items')
            ->where('name', 'ハンバーガー')
            ->first();
            
        $points = [
            [
                'student_id'       => $student_1->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'point_diff'       => 3,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_2->id,
                'affiliation_id'   => $affiliation->id,
                'room_id'          => 1,
                'point_diff'       => 2,
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_1->id,
                'item_id'          => $item_1->id,
                'amount'           => 1,
                'point_diff'       => (0-$item_1->point),
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],[
                'student_id'       => $student_2->id,
                'item_id'          => $item_2->id,
                'amount'           => 2,
                'point_diff'       => (0-2*$item_2->point),
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ]
        ];

        DB::table('points')->insert($points);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}