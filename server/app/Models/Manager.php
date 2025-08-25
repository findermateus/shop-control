<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;

class Manager extends User
{
    use HasApiTokens;

    protected $fillable = [
        'login',
        'password',
    ];

    public function toArray(): array
    {
        return [[
            'login' => $this->login,
            'id' => $this->id
        ]];
    }
}
