<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginManagerRequest;
use App\Models\Manager;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ManagerController extends Controller
{
    public function authenticate(LoginManagerRequest $request)
    {
        $manager = Manager::where('login', $request->login)->first();
        if (! $manager || ! Hash::check($request->password, $manager->password)) {
            throw ValidationException::withMessages([
                'error' => ['The provided credentials are incorrect.'],
            ]);
        }
        return [
            'token' => $manager->createToken('manager')->plainTextToken
        ];
    }
}
