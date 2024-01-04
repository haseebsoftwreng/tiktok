<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tiktok_pixels', function (Blueprint $table) {
            $table->id();
            $table->string('pixel_id')->nullable();
            $table->string('pixel_name')->nullable();
			$table->unsignedBigInteger('shop_id');
			$table->string('type', 100)->nullable();
			$table->string('tag', 100)->nullable();
			$table->string('collection', 100)->nullable();
			$table->text('access_token')->nullable();
			$table->text('test_token')->nullable();
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
			$table->boolean('status')->default(true);
            $table->foreign('shop_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiktok_pixels');
    }
};
