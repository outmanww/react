<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSocialLoginsTable extends Migration
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
            Schema::connection($connection_name)->create('social_logins', function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->integer('user_id')->unsigned();
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->string('provider', 32);
                $table->string('provider_id');
                $table->string('token')->nullable();
                $table->string('avatar')->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at');
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
            Schema::connection($connection_name)->drop('social_logins');
        }
    }
}
