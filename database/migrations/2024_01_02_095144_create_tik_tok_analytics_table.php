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
        Schema::create('tik_tok_analytics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pixel_id');
            $table->string('titokPixelId')->default("0");
            $table->string('compeletePayment')->default("0");
            $table->string('initiateCheckout')->default("0");
            $table->string('addtoCart')->default("0");
            $table->string('viewContent')->default("0");
            $table->string('search')->default("0");
            $table->string('eventDate')->nullable();
            $table->timestamps();
            $table->foreign('pixel_id')->references('id')->on('tiktok_pixels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tik_tok_analytics');
    }
};
