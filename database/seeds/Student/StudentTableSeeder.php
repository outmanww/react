<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class StudentTableSeeder
 */
class StudentTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::table('students')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM students');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE students CASCADE');
        }
        
        $students = [
            [
                'family_name'       => '山田',
                'given_name'        => '太郎',
                'family_name_yomi'  => 'ヤマダ',
                'given_name_yomi'   => 'タロウ',
                'phone'             => '09044444444',
                'sex'               => 1,
                'birthday'          => '1991/01/01',
                'student_id'        => '12345678',
                'postal_code'       => 3334444,
                'state'             => '愛知県',
                'city'              => '名古屋市千種区',
                'street'            => '不老町',
                'building'          => '',
                'introduction'      => '自己紹介です',
                'email'             => 'yamada@gmail.com',
                'password'          => bcrypt('123456'),
                'api_token'         => md5(uniqid(mt_rand(), true)),
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],            [
                'family_name'       => '鈴木',
                'given_name'        => '花子',
                'family_name_yomi'  => 'スズキ',
                'given_name_yomi'   => 'ハナコ',
                'phone'             => '09022222222',
                'sex'               => 0,
                'birthday'          => '1992/01/01',
                'student_id'        => '92345679',
                'postal_code'       => 3334444,
                'state'             => '愛知県',
                'city'              => '名古屋市千種区',
                'street'            => '不老町',
                'building'          => '',
                'introduction'      => '自己紹介です',
                'email'             => 'suzuki@react-opt.com',
                'password'          => bcrypt('123456'),
                'api_token'         => md5(uniqid(mt_rand(), true)),
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ]
        ];

        DB::table('students')->insert($students);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}