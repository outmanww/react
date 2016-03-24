<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class PermissionTableSeeder
 */
class OperationTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table(config('access.operations_table'))->truncate();
            DB::table(config('access.operation_permission_table'))->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM ' . config('access.operations_table'));
            DB::statement('DELETE FROM ' . config('access.operation_permission_table'));
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE ' . config('access.operations_table') . ' CASCADE');
            DB::statement('TRUNCATE TABLE ' . config('access.operation_permission_table') . ' CASCADE');
        }

        /**
         * 追加
         */
        $operation_model         = config('access.operation');
        $viewAdmin               = new $operation_model;
        $viewAdmin->name         = 'view-admin';
        $viewAdmin->sort         = 1;
        $viewAdmin->created_at   = Carbon::now();
        $viewAdmin->updated_at   = Carbon::now();
        $viewAdmin->save();

        $operation_model           = config('access.operation');
        $viewTeacher               = new $operation_model;
        $viewTeacher->name         = 'view-teacher';
        $viewTeacher->sort         = 2;
        $viewTeacher->created_at   = Carbon::now();
        $viewTeacher->updated_at   = Carbon::now();
        $viewTeacher->save();








        /**
         * Misc Access Permissions
         */
        $operation_model          = config('access.operation');
        $viewBackend               = new $operation_model;
        $viewBackend->name         = 'view-backend';
        $viewBackend->sort         = 1;
        $viewBackend->created_at   = Carbon::now();
        $viewBackend->updated_at   = Carbon::now();
        $viewBackend->save();

        $operation_model                   = config('access.operation');
        $viewAccessManagement               = new $operation_model;
        $viewAccessManagement->name         = 'view-access-management';
        $viewAccessManagement->sort         = 2;
        $viewAccessManagement->created_at   = Carbon::now();
        $viewAccessManagement->updated_at   = Carbon::now();
        $viewAccessManagement->save();

        /**
         * Access Permissions
         */

        /**
         * User
         */
        $operation_model          = config('access.operation');
        $createUsers               = new $operation_model;
        $createUsers->name         = 'create-users';
        $createUsers->sort         = 5;
        $createUsers->created_at   = Carbon::now();
        $createUsers->updated_at   = Carbon::now();
        $createUsers->save();

        $operation_model        = config('access.operation');
        $editUsers               = new $operation_model;
        $editUsers->name         = 'edit-users';
        $editUsers->sort         = 6;
        $editUsers->created_at   = Carbon::now();
        $editUsers->updated_at   = Carbon::now();
        $editUsers->save();

        $operation_model          = config('access.operation');
        $deleteUsers               = new $operation_model;
        $deleteUsers->name         = 'delete-users';
        $deleteUsers->sort         = 7;
        $deleteUsers->created_at   = Carbon::now();
        $deleteUsers->updated_at   = Carbon::now();
        $deleteUsers->save();

        $operation_model                 = config('access.operation');
        $changeUserPassword               = new $operation_model;
        $changeUserPassword->name         = 'change-user-password';
        $changeUserPassword->sort         = 8;
        $changeUserPassword->created_at   = Carbon::now();
        $changeUserPassword->updated_at   = Carbon::now();
        $changeUserPassword->save();

        $operation_model             = config('access.operation');
        $deactivateUser               = new $operation_model;
        $deactivateUser->name         = 'deactivate-users';
        $deactivateUser->sort         = 9;
        $deactivateUser->created_at   = Carbon::now();
        $deactivateUser->updated_at   = Carbon::now();
        $deactivateUser->save();

        $operation_model             = config('access.operation');
        $reactivateUser               = new $operation_model;
        $reactivateUser->name         = 'reactivate-users';
        $reactivateUser->sort         = 11;
        $reactivateUser->created_at   = Carbon::now();
        $reactivateUser->updated_at   = Carbon::now();
        $reactivateUser->save();

        $operation_model           = config('access.operation');
        $undeleteUser               = new $operation_model;
        $undeleteUser->name         = 'undelete-users';
        $undeleteUser->sort         = 13;
        $undeleteUser->created_at   = Carbon::now();
        $undeleteUser->updated_at   = Carbon::now();
        $undeleteUser->save();

        $operation_model                    = config('access.operation');
        $permanentlyDeleteUser               = new $operation_model;
        $permanentlyDeleteUser->name         = 'permanently-delete-users';
        $permanentlyDeleteUser->sort         = 14;
        $permanentlyDeleteUser->created_at   = Carbon::now();
        $permanentlyDeleteUser->updated_at   = Carbon::now();
        $permanentlyDeleteUser->save();

        $operation_model                      = config('access.operation');
        $resendConfirmationEmail               = new $operation_model;
        $resendConfirmationEmail->name         = 'resend-user-confirmation-email';
        $resendConfirmationEmail->sort         = 15;
        $resendConfirmationEmail->created_at   = Carbon::now();
        $resendConfirmationEmail->updated_at   = Carbon::now();
        $resendConfirmationEmail->save();

        /**
         * Role
         */
        $operation_model          = config('access.operation');
        $createRoles               = new $operation_model;
        $createRoles->name         = 'create-roles';
        $createRoles->sort         = 2;
        $createRoles->created_at   = Carbon::now();
        $createRoles->updated_at   = Carbon::now();
        $createRoles->save();

        $operation_model        = config('access.operation');
        $editRoles               = new $operation_model;
        $editRoles->name         = 'edit-roles';
        $editRoles->sort         = 3;
        $editRoles->created_at   = Carbon::now();
        $editRoles->updated_at   = Carbon::now();
        $editRoles->save();

        $operation_model          = config('access.operation');
        $deleteRoles               = new $operation_model;
        $deleteRoles->name         = 'delete-roles';
        $deleteRoles->sort         = 4;
        $deleteRoles->created_at   = Carbon::now();
        $deleteRoles->updated_at   = Carbon::now();
        $deleteRoles->save();

        /**
         * Permission
         */
        $operation_model                = config('access.operation');
        $createPermissions               = new $operation_model;
        $createPermissions->name         = 'create-permissions';
        $createPermissions->sort         = 5;
        $createPermissions->created_at   = Carbon::now();
        $createPermissions->updated_at   = Carbon::now();
        $createPermissions->save();

        $operation_model              = config('access.operation');
        $editPermissions               = new $operation_model;
        $editPermissions->name         = 'edit-permissions';
        $editPermissions->sort         = 6;
        $editPermissions->created_at   = Carbon::now();
        $editPermissions->updated_at   = Carbon::now();
        $editPermissions->save();

        $operation_model                = config('access.operation');
        $deletePermissions               = new $operation_model;
        $deletePermissions->name         = 'delete-permissions';
        $deletePermissions->sort         = 7;
        $deletePermissions->created_at   = Carbon::now();
        $deletePermissions->updated_at   = Carbon::now();
        $deletePermissions->save();

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}