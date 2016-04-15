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
        foreach (config('database.schools') as $connection_name) {
            Schema::connection($connection_name)->create('semesters', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');

                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');
                $table->softDeletes();

                $table->unique('name');
            });

            Schema::connection($connection_name)->create('lectures', function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('sort')->default(0)->unsigned();

                $table->string('title');
                $table->integer('department_id')->unsigned()->nullable();
                // lecture code decided by faculty
                $table->string('code')->nullable();

                // student grade
                $table->string('grade')->nullable();
                // lecture place
                $table->string('place')->nullable();
                $table->tinyInteger('weekday')->nullable();
                $table->tinyInteger('time_slot')->nullable();
                $table->smallInteger('length')->nullable()->unsigned();
                $table->smallInteger("year")->nullable();
                $table->integer("semester_id")->unsigned()->nullable();
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

                /**
                 * Add Foreign/Unique/Index
                 */
                $table->foreign('semester_id')
                    ->references('id')
                    ->on('semesters')
                    ->onUpdate('cascade')
                    ->onDelete('set null');
            });

            Schema::connection($connection_name)->create('rooms', function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('lecture_id')->unsigned();
                $table->integer('teacher_id')->unsigned();
                $table->integer('key')->unsigned();

                // save the url of teacher's voice record
                $table->string('voice_record')->nullable();

                // the length of the current lecture
                $table->smallInteger('length')->unsigned();
                
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');
                $table->timestamp('closed_at')->nullable();
                $table->softDeletes();
                $table->text('history_attendance')->nullable;
                $table->text('history_confused')->nullable;
                $table->text('history_interesting')->nullable;
                $table->text('history_boring')->nullable;

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

            Schema::connection($connection_name)->create('lecture_teacher', function (Blueprint $table) {
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
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach (config('database.schools') as $connection_name) {
            /**
             * Remove Foreign/Unique/Index
             */
            Schema::connection($connection_name)->table('lectures', function (Blueprint $table) {
                $table->dropForeign('lectures_department_id_foreign');
                $table->dropForeign('lectures_semester_id_foreign');
            });

            Schema::connection($connection_name)->table('rooms', function (Blueprint $table) {
                $table->dropForeign('rooms_lecture_id_foreign');
                $table->dropForeign('rooms_teacher_id_foreign');
            });        

            Schema::connection($connection_name)->table('lecture_teacher', function (Blueprint $table) {
                $table->dropForeign('lecture_teacher_lecture_id_foreign');
                $table->dropForeign('lecture_teacher_teacher_id_foreign');
                $table->dropUnique('lecture_teacher_lecture_id_teacher_id_unique');
            });
            Schema::connection($connection_name)->drop('lectures');
            Schema::connection($connection_name)->drop('rooms');
            Schema::connection($connection_name)->drop('lecture_teacher');
            Schema::connection($connection_name)->drop('semesters');
               
        }
    }
}
