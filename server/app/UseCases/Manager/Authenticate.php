<?php

namespace App\UseCases\Manager;

use App\Models\Manager;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

readonly class Authenticate
{
    public function execute(string $login, string $password): string
    {
        $manager = Manager::where('login', $login)->first();

        if (!$manager || !Hash::check($password, $manager->password)) {
            throw ValidationException::withMessages([
                'error' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $manager->createToken('manager')->plainTextToken;
    }
}
