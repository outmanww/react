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

            $department = DB::connection($connection_name)->table('departments')
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
                    'family_name'       => '宮崎',
                    'given_name'        => 'あおい',
                    'family_name_yomi'  => 'ミヤザキ',
                    'given_name_yomi'   => 'アオイ',
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
                    'url'               => 'http://www.aoimiyazaki.jp/',
                    'email'             => 'aoi.miyazaki@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ]
            ];

            DB::connection($connection_name)->table(config('access.users_table'))->insert($users);

            $department = DB::connection($connection_name)->table('departments')
                ->where('name', '数理情報系')
                ->first();        

            $users = [
                [
                    'family_name'       => '本田',
                    'given_name'        => '翼',
                    'family_name_yomi'  => 'ホンダ',
                    'given_name_yomi'   => 'ツバサ',
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
                    'introduction'      => '女優、ファッションモデル、タレントをしています。ちなみに本名です',
                    'url'               => 'http://star-studio.jp/tsubasa/',
                    'email'             => 'tubasa.honda@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'family_name'       => '広瀬',
                    'given_name'        => 'すず',
                    'family_name_yomi'  => 'ヒロセ',
                    'given_name_yomi'   => 'スズ',
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
                    'introduction'      => 'ファッションモデル、女優をしています。ちなみに、姉は女優・ファッションモデルの広瀬アリスです',
                    'url'               => 'http://ameblo.jp/suzu-hirose/',
                    'email'             => 'suzu.hirose@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                  ],[
                    'family_name'       => '佐々木',
                    'given_name'        => '希',
                    'family_name_yomi'  => 'ササキ',
                    'given_name_yomi'   => 'ノゾミ',
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
                    'introduction'      => '女優、ファッションモデル、タレントをしています。ちなみに本名です',
                    'url'               => 'http://www.s-nozomi.com/',
                    'email'             => 'nozomi.sasaki@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'family_name'       => 'Dean',
                    'given_name'        => 'John',
                    'family_name_yomi'  => 'Dean',
                    'given_name_yomi'   => 'John',
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
                    'introduction'      => 'A teacher in ABC University',
                    'url'               => 'http://www.ateacherinabcuniversity.com/',
                    'email'             => 'dean.john@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'family_name'       => '松下',
                    'given_name'        => '健',
                    'family_name_yomi'  => 'マツシタ',
                    'given_name_yomi'   => 'ケン',
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
                    'email'             => 'ken.matushita@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ],[
                    'family_name'       => '柳浦',
                    'given_name'        => '睦憲',
                    'family_name_yomi'  => 'ヤギウラ',
                    'given_name_yomi'   => 'ムツノリ',
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
                    'url'               => 'http://www.aoimiyazaki.jp/',
                    'email'             => 'mutunori.yagiura@'.$connection_name.'.com',
                    'password'          => bcrypt('123456'),
                    'confirmation_code' => md5(uniqid(mt_rand(), true)),
                    'confirmed'         => true,
                    'created_at'        => Carbon::now(),
                    'updated_at'        => Carbon::now(),
                ]
            ];

            DB::connection($connection_name)->table(config('access.users_table'))->insert($users);

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}