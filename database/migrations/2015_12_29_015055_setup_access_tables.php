<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupAccessTables extends Migration
{
    protected $connection_list = ['mysql-nagoya-u', 'mysql-toho-u'];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ($this->connection_list as $connection_name) {
            Schema::connection($connection_name)->create(config('access.roles_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->string('name');
                $table->boolean('all')->default(false);
                $table->smallInteger('sort')->default(0)->unsigned();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->unique('name');
            });

            Schema::connection($connection_name)->create(config('access.role_user_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('user_id')->unsigned();
                $table->integer('role_id')->unsigned();

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->foreign('user_id')
                    ->references('id')
                    ->on(config('access.users_table'))
                    ->onDelete('cascade');

                $table->foreign('role_id')
                    ->references('id')
                    ->on(config('access.roles_table'))
                    ->onDelete('cascade');
            });

            Schema::connection($connection_name)->create(config('access.permissions_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->string('name');
                $table->boolean('system')->default(false);
                $table->smallInteger('sort')->default(0)->unsigned();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->unique('name');
            });

            Schema::connection($connection_name)->create(config('access.permission_role_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('permission_id')->unsigned();
                $table->integer('role_id')->unsigned();

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->foreign('permission_id')
                    ->references('id')
                    ->on(config('access.permissions_table'))
                    ->onDelete('cascade');

                $table->foreign('role_id')
                    ->references('id')
                    ->on(config('access.roles_table'))
                    ->onDelete('cascade');
            });

            Schema::connection($connection_name)->create(config('access.permission_user_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('permission_id')->unsigned();
                $table->integer('user_id')->unsigned();

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->foreign('permission_id')
                    ->references('id')
                    ->on(config('access.permissions_table'))
                    ->onDelete('cascade');

                $table->foreign('user_id')
                    ->references('id')
                    ->on(config('access.users_table'))
                    ->onDelete('cascade');
            });

            Schema::connection($connection_name)->create(config('access.operations_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->string('name');
                $table->smallInteger('sort')->default(0)->unsigned();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');
            });

            Schema::connection($connection_name)->create(config('access.operation_permission_table'), function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('permission_id')->unsigned();
                $table->integer('operation_id')->unsigned();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->foreign('permission_id')
                    ->references('id')
                    ->on(config('access.permissions_table'))
                    ->onDelete('cascade');

                $table->foreign('operation_id')
                    ->references('id')
                    ->on(config('access.operations_table'))
                    ->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach ($this->connection_list as $connection_name) {
            Schema::connection($connection_name)->table(config('access.users_table'), function (Blueprint $table) {
                $table->dropColumn('status');
            });
            /**
             * Remove Foreign/Unique/Index
             */
            Schema::connection($connection_name)->table(config('access.roles_table'), function (Blueprint $table) {
                $table->dropUnique(config('access.roles_table') . '_name_unique');
            });

            Schema::connection($connection_name)->table(config('access.role_user_table'), function (Blueprint $table) {
                $table->dropForeign(config('access.role_user_table') . '_user_id_foreign');
                $table->dropForeign(config('access.role_user_table') . '_role_id_foreign');
            });

            Schema::connection($connection_name)->table(config('access.permissions_table'), function (Blueprint $table) {
                $table->dropUnique(config('access.permissions_table') . '_name_unique');
            });

            Schema::connection($connection_name)->table(config('access.permission_role_table'), function (Blueprint $table) {
                $table->dropForeign(config('access.permission_role_table') . '_permission_id_foreign');
                $table->dropForeign(config('access.permission_role_table') . '_role_id_foreign');
            });

            Schema::connection($connection_name)->table(config('access.permission_user_table'), function (Blueprint $table) {
                $table->dropForeign(config('access.permission_user_table') . '_permission_id_foreign');
                $table->dropForeign(config('access.permission_user_table') . '_user_id_foreign');
            });

            Schema::connection($connection_name)->table(config('access.operation_permission_table'), function (Blueprint $table) {
                $table->dropForeign(config('access.operation_permission_table') . '_permission_id_foreign');
                $table->dropForeign(config('access.operation_permission_table') . '_operation_id_foreign');
            });

            /**
             * Drop tables
             */
            Schema::connection($connection_name)->drop(config('access.role_user_table'));
            Schema::connection($connection_name)->drop(config('access.permission_role_table'));
            Schema::connection($connection_name)->drop(config('access.permission_user_table'));
            Schema::connection($connection_name)->drop(config('access.roles_table'));
            Schema::connection($connection_name)->drop(config('access.permissions_table'));
            Schema::connection($connection_name)->drop(config('access.operation_permission_table'));
            Schema::connection($connection_name)->drop(config('access.operations_table'));
        }
    }
}
