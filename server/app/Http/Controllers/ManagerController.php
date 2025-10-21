<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginManagerRequest;
use App\UseCases\Manager\Authenticate;
use Illuminate\Http\Request;

class ManagerController extends Controller
{
    public function __construct(private readonly Authenticate $authenticate)
    {
    }

    public function authenticate(LoginManagerRequest $request)
    {
        $data = $request->validated();
        $token = $this->authenticate->execute($data['login'], $data['password']);

        return [
            'token' => $token
        ];
    }

    public function getUser(Request $request)
    {
        return $request->user('manager');
    }
}
