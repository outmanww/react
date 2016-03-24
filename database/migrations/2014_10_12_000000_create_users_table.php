<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(config('access.users_table'), function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password', 60)->nullable();
            $table->tinyInteger('status')->default(1)->unsigned();
            $table->string('confirmation_code');
            $table->boolean('confirmed')->default(config('access.users.confirm_email') ? false : true);
            $table->rememberToken();

            $table->string('family_name');
            $table->string('given_name');
            $table->string('family_name_yomi')->nullable();
            $table->string('given_name_yomi')->nullable();
            $table->string('phone')->nullable();
            $table->string('sex')->nullable();
            $table->string('birthday')->nullable();
            $table->string('personal_id')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('introduction')->nullable();

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            // $table->string('department_id');

            // /**
            //  * Add Foreign/Unique/Index
            //  */
            // $table->foreign('department_id')
            //     ->references('id')
            //     ->on(config('lecture.department_table'))
            //     ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
