<?php

namespace App\Console\Commands;

use App\Http\Controllers\ManagerController;
use App\Models\Manager;
use Illuminate\Console\Command;

class GenerateDefaultUser extends Command
{
    /**
     * @var string
     */
    protected $signature = 'app:generate-default-user';

    /**
     * @var string
     */
    protected $description = 'Generate User for local database development';

    public function handle()
    {
        $hashedPassword = bcrypt('password');
        Manager::create([
            'login' => 'admin',
            'password' => $hashedPassword,
        ]);
        $this->info('Default user created successfully.');
    }
}
