<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserRoleSeeder
 */
class UserRoleSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table(config('access.role_user_table'))->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM ' . config('access.role_user_table'));
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE ' . config('access.role_user_table') . ' CASCADE');
        }

        $role_super = DB::table(config('access.roles_table'))
            ->where('name', 'SuperAdministrator')
            ->first();

        $role_admin = DB::table(config('access.roles_table'))
            ->where('name', 'Administrator')
            ->first();

        $role_teacher = DB::table(config('access.roles_table'))
            ->where('name', 'Teacher')
            ->first();

        //Attach admin role to admin user
        $user_model = config('auth.providers.users.model');
        $user_model = new $user_model;
        $user_model::where('name', 'Super Administrator')->attachRole($role_super->id);

        //Attach user role to general user
        $user_model = config('auth.providers.users.model');
        $user_model = new $user_model;
        $user_model::where('name', 'Admin Istrator')->attachRole($role_super->id);

        //Attach user role to general user
        $user_model = config('auth.providers.users.model');
        $user_model = new $user_model;
        $user_model::where('name', 'Admin Istrator')->attachRole($role_super->id);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}