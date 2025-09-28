<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->string('order_code')->unique();
            $table->foreignId('address_id')->constrained('addresses')->onDelete('restrict');
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
            
            $table->index(['customer_id', 'status']);
            $table->index('order_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
