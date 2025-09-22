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
        Schema::create('stock_histories', function (Blueprint $table) {
            $table->id();
            $table->string('justification');
            $table->integer('stock');
            $table->integer('quantity_changed');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('clothing_variant_id')->nullable()->constrained('clothes_variants')->onDelete('cascade');
            $table->foreignId('manager_id')->constrained('managers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_histories');
    }
};
