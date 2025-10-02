<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('postal_code', 20);  // CEP
            $table->string('street');           // Rua
            $table->string('neighborhood');     // Bairro
            $table->string('number', 20);       // Número
            $table->string('complement')->nullable(); // Complemento
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
