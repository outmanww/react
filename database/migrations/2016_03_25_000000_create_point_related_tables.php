<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePointRelatedTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            $table->unique('name');
        });

        Schema::create('shops', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('type_id')->unsigned();
            $table->string('logo_path')->nullable();
            $table->string('image_path')->nullable();
            $table->string('url')->nullable();
            $table->text('description')->nullable();

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();
            /**
             * Add Foreign shop_id
             */
            $table->foreign('type_id')
                ->references('id')
                ->on('shop_types')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unique('name');
        });

        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('points');
            $table->integer('shop_id')->unsigned();
            $table->boolean('is_recommend')->default(false);
            
//          $table->tinyInteger('category')->nullable();
            $table->string('image_path')->nullable();
            $table->string('url')->nullable();
            $table->text('description')->nullable();

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
            $table->softDeletes();

            /**
             * Add Foreign shop_id
             */
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::create('points', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('student_id')->unsigned();
            // +points
            $table->integer('affiliation_id')->unsigned()->nullable()->default(DB::raw('null'));;
            $table->integer('room_id')->unsigned()->nullable()->default(DB::raw('null'));;
            // -points
            $table->integer('item_id')->unsigned()->nullable()->default(DB::raw('null'));;
            $table->integer('amount')->unsigned()->nullable()->default(DB::raw('null'));;

            $table->integer('point_diff');
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at');
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
                ->onDelete('set null');

            /**
             * Add Foreign affiliation_id
             */
            $table->foreign('item_id')
                ->references('id')
                ->on('items')
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
        Schema::table('shop_types', function (Blueprint $table) {
            $table->dropUnique('shop_types_name_unique');
        });
        
        Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign('shops_type_id_foreign');
            $table->dropUnique('shops_name_unique');
        });

        Schema::table('items', function (Blueprint $table) {
            $table->dropForeign('items_shop_id_foreign');
        });

        Schema::table('points', function (Blueprint $table) {
            $table->dropForeign('points_student_id_foreign');
            $table->dropForeign('points_affiliation_id_foreign');
            $table->dropForeign('points_item_id_foreign');
        });
        
        Schema::drop('shop_types');
        Schema::drop('items');
        Schema::drop('shops');
        Schema::drop('points');
    }
}
