<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AffiliationRelatedTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        $this->call(CampusTableSeeder::class);
        $this->call(FacultyTableSeeder::class);
        $this->call(CampusFacultySeeder::class);
        $this->call(DepartmentTableSeeder::class);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

    }
}
