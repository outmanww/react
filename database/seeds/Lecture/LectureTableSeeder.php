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
        foreach (config('database.schools') as $connection_name) {

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->table('lectures')->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM lectures');
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE lectures CASCADE');
            }
            
            // seed lectures table
            $department_1 = DB::connection($connection_name)->table('departments')
                ->where('name', '数理情報系')
                ->first();
            $department_2 = DB::connection($connection_name)->table('departments')
                ->where('name', '心理社会行動')
                ->first();

            $lectures = [
                [
                    'title'         => '線形代数',
                    'sort'          => '1',
                    'department_id' => $department_1->id,
                    'code'          => '121212',
                    'grade'         => '学部１年',
                    'place'         => 'IB館４０３',
                    'weekday'       => '1',
                    'time_slot'     => '1',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '微積分',
                    'sort'          => '2',
                    'department_id' => $department_1->id,
                    'code'          => '131212',
                    'grade'         => '学部１年',
                    'place'         => 'IB館４０4',
                    'weekday'       => '1',
                    'time_slot'     => '2',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '離散数学',
                    'sort'          => '3',
                    'department_id' => $department_1->id,
                    'code'          => '141212',
                    'grade'         => '学部３年',
                    'place'         => 'IB館４０4',
                    'weekday'       => '1',
                    'time_slot'     => '3',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '統計学',
                    'sort'          => '4',
                    'department_id' => $department_1->id,
                    'code'          => '151212',
                    'grade'         => '学部１年',
                    'place'         => 'IB館４０5',
                    'weekday'       => '1',
                    'time_slot'     => '4',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => 'Leading',
                    'sort'          => '5',
                    'department_id' => $department_1->id,
                    'code'          => '261212',
                    'grade'         => '全学年',
                    'place'         => 'IB館４１5',
                    'weekday'       => '1',
                    'time_slot'     => '5',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '図論',
                    'sort'          => '6',
                    'department_id' => $department_1->id,
                    'code'          => '351212',
                    'grade'         => '学部１年',
                    'place'         => 'IB館４25',
                    'weekday'       => '2',
                    'time_slot'     => '1',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '経営学',
                    'sort'          => '7',
                    'department_id' => $department_1->id,
                    'code'          => '171212',
                    'grade'         => '学部２年',
                    'place'         => 'IB館４65',
                    'weekday'       => '2',
                    'time_slot'     => '2',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '集合論',
                    'sort'          => '8',
                    'department_id' => $department_1->id,
                    'code'          => '001212',
                    'grade'         => '学部２年',
                    'place'         => 'IB館1０5',
                    'weekday'       => '2',
                    'time_slot'     => '3',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => 'プログラミング',
                    'sort'          => '9',
                    'department_id' => $department_1->id,
                    'code'          => '151312',
                    'grade'         => '学部２年',
                    'place'         => 'IB館９０5',
                    'weekday'       => '2',
                    'time_slot'     => '4',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => 'データ構造',
                    'sort'          => '10',
                    'department_id' => $department_1->id,
                    'code'          => '151213',
                    'grade'         => '学部２年',
                    'place'         => 'IB館４６5',
                    'weekday'       => '3',
                    'time_slot'     => '5',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '理系基本授業です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => '国際政治学',
                    'sort'          => '11',
                    'department_id' => $department_2->id,
                    'code'          => '321212',
                    'grade'         => '学部３年',
                    'place'         => '工学５号館２０１',
                    'weekday'       => '3',
                    'time_slot'     => '6',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => '専攻の特論です',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
                [
                    'title'         => 'Mathmatics',
                    'sort'          => '12',
                    'department_id' => $department_2->id,
                    'code'          => '121256',
                    'grade'         => '学部３年',
                    'place'         => '工学５号館２０１',
                    'weekday'       => '3',
                    'time_slot'     => '6',
                    'length'        => '90',
                    'year'          => 2016,
                    'semester_id'   => 1,
                    'description'   => 'A lecture for mathmatics',
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now()
                ],
            ];

            DB::connection($connection_name)->table('lectures')->insert($lectures);

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}