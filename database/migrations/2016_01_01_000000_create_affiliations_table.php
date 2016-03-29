<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAffiliationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faculties', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->integer('sort')->default(0)->unsigned();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            /**
             * Add Foreign/Unique/Index
             */
            $table->unique('name');
        });

        Schema::create('departments', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('faculty_id')->unsigned();
            $table->string('name');
            $table->smallInteger('sort')->default(0)->unsigned();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            /**
             * Add Foreign/Unique/Index
             */

            $table->foreign('faculty_id')
                ->references('id')
                ->on('faculties')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        // set foreing key for users table
        Schema::table(config('access.users_table'), function (Blueprint $table) {
            $table->integer('department_id')->unsigned()->nullable();
            /**
             * Add Foreign/Unique/Index
             */
            $table->foreign('department_id')
                ->references('id')
                ->on('departments')
                ->onUpdate('cascade')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /**
         * Remove Foreign/Unique/Index
         */
        Schema::table('faculties', function (Blueprint $table) {
            $table->dropUnique('faculties_name_unique');
        });

        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign('departments_faculty_id_foreign');
        });

        Schema::table(config('access.users_table'), function (Blueprint $table) {
            $table->dropForeign(config('access.users_table').'_department_id_foreign');
            $table->dropColumn('department_id');
        });

        Schema::drop('faculties');
        Schema::drop('departments');
    }
}
