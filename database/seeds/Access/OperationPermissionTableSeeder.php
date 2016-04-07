<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserRoleSeeder
 */
class OperationPermissionTableSeeder extends Seeder
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

            $role_admin = DB::connection($connection_name)->table(config('access.operation'))
                ->where('name', 'Administrator')
                ->first();

            $role_teacher = DB::connection($connection_name)->table(config('access.operation'))
                ->where('name', 'Teacher')
                ->first();

            //Attach user role to general user
            $user_model = config('auth.providers.users.model');
            $user_model = new $user_model;
            $user_model::on($connection_name)->where('email', 'admin@admin.com')->first()->roles()->attach($role_admin->id);

            //Attach user role to general user
            $user_model = config('auth.providers.users.model');
            $user_model = new $user_model;
            $user_model::on($connection_name)->where('name', 'Admin Istrator')->first()->roles()->attach($role_teacher->id);

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}