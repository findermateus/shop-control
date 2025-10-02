<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('cellphone')->nullable();
            $table->string('oauth_provider');
            $table->string('oauth_provider_id')->nullable();
            $table->timestamps();
            
            $table->unique(['email', 'oauth_provider']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
