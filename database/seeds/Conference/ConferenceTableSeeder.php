<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon as Carbon;

/**
 * Class ConferenceTableSeeder
 */
class ConferenceTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections.conference.driver') == 'mysql'){
            DB::connection('conference')->statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections.conference.driver') == 'mysql'){
            DB::connection('conference')->table('users')->truncate();
            DB::connection('conference')->table('conferences')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::connection('conference')->statement('DELETE FROM users');
            DB::connection('conference')->statement('DELETE FROM conferences');
        } else {
            //For PostgreSQL or anything else
            DB::connection('conference')->statement('TRUNCATE TABLE users CASCADE');
            DB::connection('conference')->statement('TRUNCATE TABLE conferences CASCADE');
        }

        $now = Carbon::now();

        $users = [
            [
                'family_name'       => '斉藤',
                'given_name'        => '健',
                'family_name_yomi'  => 'サイトウ',
                'given_name_yomi'   => 'ケン',
                'phone'             => '08012345678',
                'status'            => 1,
                'url'               => 'http://www.aoimiyazaki.jp/',
                'email'             => 'ken.saito@'.'conference'.'.com',
                'password'          => bcrypt('123456'),
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => $now,
                'updated_at'        => $now,
            ]
        ];

        DB::connection('conference')->table('users')->insert($users);

        $conferences = [
            [
                'user_id'     => 1,
                'status'      => 0,
                'title'       => 'サンプル講演会',
                'place'       => 'ミッドランドスクエア',
                'description' => '講演会の説明',
                'start_at'    => $now,
                'created_at'  => $now,
                'updated_at'  => $now
            ]
        ];

        DB::connection('conference')->table('conferences')->insert($conferences);

        if(config('database.connections.conference.driver') == 'mysql'){
            DB::connection('conference')->statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}