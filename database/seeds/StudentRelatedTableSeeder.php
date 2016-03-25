<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentRelatedTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        $this->call(AffiliationTableSeeder::class);
        $this->call(StudentTableSeeder::class);
        $this->call(ReactionTypeTableSeeder::class);
        $this->call(ReactionTableSeeder::class);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

    }
}
