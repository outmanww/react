<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class PermissionTableSeeder
 */
class PermissionTableSeeder extends Seeder
{
    protected $connection_list = ['mysql-nagoya-u', 'mysql-toho-u'];

    public function run()
    {
        foreach ($this->connection_list as $connection_name) {

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=0;');
            }

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->table(config('access.permissions_table'))->truncate();
                DB::connection($connection_name)->table(config('access.permission_role_table'))->truncate();
                DB::connection($connection_name)->table(config('access.permission_user_table'))->truncate();
            } elseif (env('DB_CONNECTION') == 'sqlite') {
                DB::connection($connection_name)->statement('DELETE FROM ' . config('access.permissions_table'));
                DB::connection($connection_name)->statement('DELETE FROM ' . config('access.permission_role_table'));
                DB::connection($connection_name)->statement('DELETE FROM ' . config('access.permission_user_table'));
            } else {
                //For PostgreSQL or anything else
                DB::connection($connection_name)->statement('TRUNCATE TABLE ' . config('access.permissions_table') . ' CASCADE');
                DB::connection($connection_name)->statement('TRUNCATE TABLE ' . config('access.permission_role_table') . ' CASCADE');
                DB::connection($connection_name)->statement('TRUNCATE TABLE ' . config('access.permission_user_table') . ' CASCADE');
            }

            $permissions= [
                [
                    'name'       => 'view-backend',
                    'sort'       => 1,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'view-access-management',
                    'sort'       => 2,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'create-users',
                    'sort'       => 3,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'edit-users',
                    'sort'       => 5,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'delete-users',
                    'sort'       => 6,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'change-user-password',
                    'sort'       => 7,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'deactivate-users',
                    'sort'       => 8,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'reactivate-users',
                    'sort'       => 9,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'undelete-users',
                    'sort'       => 10,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'permanently-delete-users',
                    'sort'       => 11,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'resend-user-confirmation-email',
                    'sort'       => 12,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'create-roles',
                    'sort'       => 13,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'edit-roles',
                    'sort'       => 14,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'delete-roles',
                    'sort'       => 15,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'create-permissions',
                    'sort'       => 16,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'edit-permissions',
                    'sort'       => 17,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],[
                    'name'       => 'delete-permissions',
                    'sort'       => 18,
                    'system'     => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            ];

            DB::connection($connection_name)
                ->table(config('access.permissions_table'))
                ->insert($permissions);

            if(strpos($connection_name, 'mysql') !== false){
                DB::connection($connection_name)->statement('SET FOREIGN_KEY_CHECKS=1;');
            }
        }
    }
}