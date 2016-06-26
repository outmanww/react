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
        foreach (config('database.schools') as $connection_name) {
            Schema::connection($connection_name)->create(config('access.users_table'), function (Blueprint $table) {
                $table->increments('id');
                $table->string('email')->unique();
                $table->string('password', 60)->nullable();

                $table->tinyInteger('status')->default(0)->unsigned();
                $table->tinyInteger('teacher_confirmed')->default(0)->unsigned();
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
                $table->string('personal_id')->nullable();
                $table->string('postal_code')->nullable();
                $table->string('state')->nullable();
                $table->string('city')->nullable();
                $table->string('street')->nullable();
                $table->string('building')->nullable();
                $table->string('introduction')->nullable();
                $table->string('url')->nullable();

                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');
                $table->softDeletes();
            });
        }

        Schema::connection('conference')->create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password', 60)->nullable();

            $table->tinyInteger('status')->default(0)->unsigned();
            $table->string('confirmation_code');
            $table->boolean('confirmed')->default(true);
            $table->rememberToken();

            $table->string('family_name');
            $table->string('given_name');
            $table->string('family_name_yomi')->nullable();
            $table->string('given_name_yomi')->nullable();
            $table->string('phone')->nullable();
            $table->string('url')->nullable();

            $table->timestamps;
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach (config('database.schools') as $connection_name) {
            Schema::connection($connection_name)->drop('users');
        }

        Schema::connection('conference')->drop('users');
    }
}
