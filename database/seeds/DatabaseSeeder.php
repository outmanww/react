<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        $this->call(AffiliationRelatedTableSeeder::class);
        $this->call(AccessTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(LectureRelatedTableSeeder::class);
        $this->call(StudentRelatedTableSeeder::class);
        $this->call(PointRelatedTableSeeder::class);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        Model::reguard();
    }
}
