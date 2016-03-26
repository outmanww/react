<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLectureRelatedTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lectures', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('sort')->default(0)->unsigned();

            $table->string('title');
            $table->integer('department_id')->unsigned()->nullable();
            // lecture code decided by faculty
            $table->string('code')->nullable();

            // student grade
            $table->tinyInteger('grade')->nullable();
            $table->tinyInteger('time_slot')->nullable();
            $table->smallInteger('length')->nullable()->unsigned();
            $table->tinyInteger("year")->nullable();
            $table->tinyInteger("semester")->nullable();
            // 1:current lecture 0:closed lecture
            $table->tinyInteger("status")->default(1);
            $table->text('description');

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            /**
             * Add Foreign/Unique/Index
             */
            $table->foreign('department_id')
                ->references('id')
                ->on('departments')
                ->onUpdate('cascade')
                ->onDelete('set null');
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('lecture_id')->unsigned();
            $table->integer('teacher_id')->unsigned();
            $table->integer('key')->unsigned();

            // save the url of teacher's voice record
            $table->string('voice_record')->nullable();

            // the length of the current lecture
            $table->smallInteger('length')->unsigned();
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('closed_at')->nullable();
            $table->softDeletes();

            /**
             * Add Foreign lecture_id
             */
            $table->foreign('lecture_id')
                ->references('id')
                ->on('lectures')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            /**
             * Add Foreign teacher_id
             */
            $table->foreign('teacher_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::create('lecture_teacher', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('lecture_id')->unsigned();
            $table->integer('teacher_id')->unsigned();
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');

            /**
             * Add Unique lecture_id + teacher_id
             */
            $table->unique(['lecture_id','teacher_id']);

            /**
             * Add Foreign lecture_id
             */
            $table->foreign('lecture_id')
                ->references('id')
                ->on('lectures')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            /**
             * Add Foreign teacher_id
             */
            $table->foreign('teacher_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
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
        Schema::table('lectures', function (Blueprint $table) {
            $table->dropForeign('lectures_department_id_foreign');
        });

        Schema::table('rooms', function (Blueprint $table) {
            $table->dropForeign('rooms_lecture_id_foreign');
            $table->dropForeign('rooms_teacher_id_foreign');
        });        

        Schema::table('lecture_teacher', function (Blueprint $table) {
            $table->dropForeign('lecture_teacher_lecture_id_foreign');
            $table->dropForeign('lecture_teacher_teacher_id_foreign');
        });
        Schema::drop('lectures');
        Schema::drop('rooms');
        Schema::drop('lecture_teacher');

    }
}
