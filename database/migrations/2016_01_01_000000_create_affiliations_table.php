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
        Schema::create('campuses', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->smallInteger('sort')->default(0)->unsigned();
            // 経度
            $table->double('geo_lat');
            // 緯度
            $table->double('geo_long');
            // 範囲（メートル）
            $table->integer('range')->default(1000)->unsigned();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            /**
             * Add Foreign/Unique/Index
             */
            $table->unique('name');
            $table->unique(['geo_lat','geo_long']);
        });

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

        Schema::create('campus_faculty', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('campus_id')->unsigned();
            $table->integer('faculty_id')->unsigned();
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');

            /**
             * Add Unique lecture_id + teacher_id
             */
            $table->unique(['campus_id','faculty_id']);

            /**
             * Add Foreign lecture_id
             */
            $table->foreign('campus_id')
                ->references('id')
                ->on('campuses')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            /**
             * Add Foreign teacher_id
             */
            $table->foreign('faculty_id')
                ->references('id')
                ->on('faculties')
                ->onUpdate('cascade')
                ->onDelete('cascade');
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
        Schema::table('campuses', function (Blueprint $table) {
            $table->dropUnique('campuses_name_unique');
            $table->dropUnique('campuses_geo_lat_geo_long_unique');
        });

        Schema::table('faculties', function (Blueprint $table) {
            $table->dropUnique('faculties_name_unique');
        });

        Schema::table('campus_faculty', function (Blueprint $table) {
            $table->dropForeign('campus_faculty_campus_id_foreign');
            $table->dropForeign('campus_faculty_faculty_id_foreign');
            $table->dropUnique('campus_faculty_campus_id_faculty_id_unique');
        });

        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign('departments_faculty_id_foreign');
        });

        Schema::table(config('access.users_table'), function (Blueprint $table) {
            $table->dropForeign(config('access.users_table').'_department_id_foreign');
            $table->dropColumn('department_id');
        });

        Schema::drop('campuses');
        Schema::drop('faculties');
        Schema::drop('campus_faculty');
        Schema::drop('departments');
    }
}
