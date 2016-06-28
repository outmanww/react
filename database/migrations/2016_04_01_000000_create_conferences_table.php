<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('conference')->create('users', function (Blueprint $table) {
            $table->increments('id')->unsigned();
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

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::connection('conference')->create('conferences', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->tinyInteger('status')->default(0);
            $table->string('title');
            $table->string('place');
            $table->string('description');
            $table->timestamp('start_at');
            $table->timestamps();
            $table->softDeletes();

            // Add Foreign/Unique/Index
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::connection('conference')->create('messages', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('conference_id')->unsigned();
            $table->integer('auditor_id')->unsigned();
            $table->tinyInteger('type')->default(1);
            $table->string('text');
            $table->timestamps();
            $table->softDeletes();

            // Add Foreign/Unique/Index
            $table->foreign('conference_id')
                ->references('id')
                ->on('conferences')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::connection('conference')->create('likes', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('message_id')->unsigned();
            $table->integer('auditor_id')->unsigned();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
            $table->softDeletes();

            // Add Foreign/Unique/Index
            $table->foreign('message_id')
                ->references('id')
                ->on('messages')
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
        Schema::connection('conference')->drop('users');
        Schema::connection('conference')->drop('conferences');
        Schema::connection('conference')->drop('messages');
        Schema::connection('conference')->drop('likes');
    }
}
