<?php

use App\Enum\ClothingSize;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clothes_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->enum('size', ClothingSize::cases());
            $table->integer('stock')->default(0);
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->integer('stock')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clothes_variants');

        Schema::table('products', function (Blueprint $table) {
            $table->integer('stock')->nullable(false)->change();
        });
    }
};
