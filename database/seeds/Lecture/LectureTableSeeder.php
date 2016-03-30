<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class LectureTableSeeder
 */
class LectureTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('lectures')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM lectures');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE lectures CASCADE');
        }
        
        // seed lectures table
        $department_1 = DB::table('departments')
            ->where('name', '共通')
            ->first();
        $department_2 = DB::table('departments')
            ->where('name', '心理社会行動')
            ->first();

        $lectures = [
            [
                'title'         => '線形代数',
                'sort'          => '1',
                'department_id' => $department_1->id,
                'code'          => '121212',
                'grade'         => '2',
                'place'         => 'IB館４０３',
                'time_slot'     => '5',
                'length'        => '90',
                'year'          => '2016',
                'semester'      => '1',
                'description'   => '理系基本授業です',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title'         => '犯罪心理学',
                'sort'          => '2',
                'department_id' => $department_2->id,
                'code'          => '321212',
                'grade'         => '3',
                'place'         => '工学５号館２０１',
                'time_slot'     => '2',
                'length'        => '90',
                'year'          => '2016',
                'semester'      => '1',
                'description'   => '専攻の特論です',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ];

        DB::table('lectures')->insert($lectures);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}