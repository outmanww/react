<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class ReactionTableSeeder
 */
class ReactionTableSeeder extends Seeder
{
    public function run()
    {
        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::table('reactions')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM reactions');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE reactions CASCADE');
        }
        
        // seed reactions table
        $nagoya_u = DB::table('affiliations')
            ->where('name', '名古屋大学')
            ->first();

        $active_room = DB::connection($nagoya_u->db_name)
            ->table('rooms')
            ->where('closed_at', null)
            ->first();

        $student_ids = DB::table('students')
            ->lists('id');

        $reactions = [];

        foreach ($student_ids as $key => $student_id) {
            $rand_enter = mt_rand(80, 89);

            array_push($reactions,
                [
                    'student_id'       => $student_id,
                    'affiliation_id'   => $nagoya_u->id,
                    'room_id'          => $active_room->id,
                    'action_id'        => 1,
                    'type_id'          => 1,
                    'message'          => null,
                    'created_at'       => Carbon::now()->subMinutes($rand_enter)
                ],[
                    'student_id'       => $student_id,
                    'affiliation_id'   => $nagoya_u->id,
                    'room_id'          => $active_room->id,
                    'action_id'        => 2,
                    'type_id'          => mt_rand(1, 3),
                    'message'          => null,
                    'created_at'       => Carbon::now()->subMinutes($rand_enter - 5)
                ],[
                    'student_id'       => $student_id,
                    'affiliation_id'   => $nagoya_u->id,
                    'room_id'          => $active_room->id,
                    'action_id'        => 2,
                    'type_id'          => mt_rand(1, 3),
                    'message'          => null,
                    'created_at'       => Carbon::now()->subMinutes($rand_enter - 7)
                ]
            );
        }

        for ($i=0; $i < 200; $i++) {
            $keyArray = array_rand($student_ids, 1);
            $reactions[] = [
                'student_id'       => $student_ids[$keyArray],
                'affiliation_id'   => $nagoya_u->id,
                'room_id'          => $active_room->id,
                'action_id'        => 2,
                'type_id'          => mt_rand(1, 3),
                'message'          => null,
                'created_at'       => Carbon::now()->subMinutes(mt_rand(1, 79))
            ];
        }

        $messages = [
            "ドイツと日本の選挙で１番大きな違いはなんですか？",
            "レポートの提出先はどこですか",
            "先週のレポートはいつ出せばいいですか？",
            "国民国家日てもう少し詳しく教えてください",
            "日本とアメリカの関係性は今は良いのですか？",
            "日本にとってアメリカと中国は、どちらの外交を重視すべきか",
            "ウェストファリア体制の問題点について詳しく教えてください",
            "中国に経済支援を継続している理由が分からないので、もう一度説明して欲しい",
            "次回は何ページから始まるか",
            "まだ黒板を消さないで欲しい",
            "この先5年で、日米の関係性はどう変化していきますか？",
            "第一次大戦後、社会主義国家であるソビエト連邦が勢力を持つことになった理由はなんですか？",
            "軍事費の拡大は世界で許されることなのか？",
            "どうなのか！",
            "いつやるの？",
            "中間テストの範囲を教えてください",
            "この講義を受講するのにあたって読んでおいたほうがいい書籍があれば教えてください",
            "国際政治学を学ぶ意義、目的を教えてください",
            "先生が他に担当している授業で受講したほうがいい講義はなんでしょうか",
            "今日遅刻してすみません",
        ];

        for ($i=0; $i < 20; $i++) {
            $keyArray = array_rand($student_ids, 1);
            $reactions[] = [
                'student_id'       => $student_ids[$keyArray],
                'affiliation_id'   => $nagoya_u->id,
                'room_id'          => $active_room->id,
                'action_id'        => 4,
                'type_id'          => mt_rand(1, 3),
                'message'          => $messages[mt_rand(0, 19)],
                'created_at'       => Carbon::now()->subMinutes(mt_rand(1, 79))
            ];
        }

        DB::table('reactions')->insert($reactions);

        if(config('database.connections')[config('database.default')]['driver'] == 'mysql'){
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}