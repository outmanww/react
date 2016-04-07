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
        foreach (config('database.schools') as $connection_name) {

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->table(config('access.role_user_table'))->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM ' . config('access.role_user_table'));
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE ' . config('access.role_user_table') . ' CASCADE');
            }

            $role_admin = DB::connection($connection_name)->table(config('access.roles_table'))
                ->where('name', 'Administrator')
                ->first();

            $role_teacher = DB::connection($connection_name)->table(config('access.roles_table'))
                ->where('name', 'Teacher')
                ->first();

            $user = new \App\Models\Access\User\User;
            $user->setConnection($connection_name);

            $user->where('email', 'admin@admin.com')
                ->first()
                ->roles()
                ->attach($role_admin->id);

            $user_model = config('auth.providers.users.model');
            $user_model = new $user_model;
            $user->setConnection($connection_name);

            $user->where('email', 'teacher@teacher.com')
                ->first()
                ->roles()
                ->attach($role_teacher->id);

            if(config('database.connections')[$connection_name]['driver'] == 'mysql'){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}