<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentRelatedTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('affiliations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('db_name');
            $table->string('name');
            $table->string('logo_path')->nullable();
            $table->string('image_path')->nullable();
            $table->string('url')->nullable();
            $table->text('description')->nullable();
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            /**
             * Add Foreign/Unique/Index
             */
            $table->unique('name');
            $table->unique('db_name');
        });

        Schema::create('students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password', 60)->nullable();

            $table->tinyInteger('status')->default(1)->unsigned();
            $table->string('api_token', 60)->unique();
            $table->string('confirmation_code');
            $table->boolean('confirmed')->default(config('access.users.confirm_email') ? false : true);
            $table->rememberToken();

            $table->string('family_name');
            $table->string('given_name');
            $table->string('family_name_yomi')->nullable();
            $table->string('given_name_yomi')->nullable();
            $table->string('phone')->nullable();
            $table->tinyInteger('sex')->nullable();
            $table->date('birthday')->nullable();
            $table->string('student_id')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('introduction')->nullable();

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();
        });

        Schema::create('reaction_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            $table->unique('name');
        });

        Schema::create('reactions', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('student_id')->unsigned();
            $table->integer('affiliation_id')->unsigned();
            $table->integer('room_id')->unsigned();
            $table->integer('action_id')->unsigned();
            $table->integer('type_id')->unsigned();
            $table->string('message')->nullable();
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->softDeletes();

            /**
             * Add Foreign student_id
             */
            $table->foreign('student_id')
                ->references('id')
                ->on('students')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            /**
             * Add Foreign affiliation_id
             */
            $table->foreign('affiliation_id')
                ->references('id')
                ->on('affiliations')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            /**
             * Add Foreign action_id
             */
            $table->foreign('action_id')
                ->references('id')
                ->on('reaction_types')
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
        Schema::table('affiliations', function (Blueprint $table) {
            $table->dropUnique('affiliations_name_unique');
            $table->dropUnique('affiliations_db_name_unique');
        });
        Schema::table('reactions', function (Blueprint $table) {
            $table->dropForeign('reactions_student_id_foreign');
            $table->dropForeign('reactions_affiliation_id_foreign');
            $table->dropForeign('reactions_action_id_foreign');
        });
        Schema::table('reaction_types', function (Blueprint $table) {
            $table->dropUnique('reaction_types_name_unique');
        });
        
        Schema::drop('affiliations');
        Schema::drop('students');
        Schema::drop('reaction_types');
        Schema::drop('reactions');

    }
}
