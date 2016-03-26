<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class UserTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table(config('access.users_table'))->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM ' . config('access.users_table'));
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE ' . config('access.users_table') . ' CASCADE');
        }
        
        $department = DB::table('departments')
            ->where('name', '生涯教育開発')
            ->first();
        
        $users = [
            [
                'family_name'       => 'Admin',
                'given_name'        => 'Istrator',
                'family_name_yomi'  => 'アドミン',
                'given_name_yomi'   => 'イステイター',
                'phone'             => '08012345678',
                'department_id'     => $department->id,
                'status'            => 1,
                'sex'               => 0,
                'birthday'          => '1991/01/01',
                'personal_id'       => 12345678,
                'postal_code'       => 3334444,
                'state'             => '愛知県',
                'city'              => '名古屋市千種区',
                'street'            => '不老町',
                'building'          => '',
                'introduction'      => '自己紹介です',
                'url'               => 'http://www.co.cm.is.nagoya-u.ac.jp/~goi/',
                'email'             => 'admin@admin.com',
                'password'          => bcrypt('123456'),
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],            [
                'family_name'       => 'Teacher',
                'given_name'        => 'User',
                'family_name_yomi'  => 'ティーチャー',
                'given_name_yomi'   => 'ユーザー',
                'phone'             => '08012345678',
                'department_id'     => $department->id,
                'status'            => 1,
                'sex'               => 0,
                'birthday'          => '1991/01/01',
                'personal_id'       => 12345678,
                'postal_code'       => 3334444,
                'state'             => '愛知県',
                'city'              => '名古屋市千種区',
                'street'            => '不老町',
                'building'          => '',
                'introduction'      => '自己紹介です',
                'url'               => 'http://www.co.cm.is.nagoya-u.ac.jp/~yagiura/',
                'email'             => 'teacher@teacher.com',
                'password'          => bcrypt('123456'),
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ]
        ];

        DB::table(config('access.users_table'))->insert($users);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}