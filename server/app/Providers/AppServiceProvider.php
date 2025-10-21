<?php

namespace App\Providers;

use App\Interfaces\Services\LogServiceInterface;
use App\Services\LogService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(LogServiceInterface::class, LogService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
