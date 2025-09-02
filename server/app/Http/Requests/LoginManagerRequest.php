<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginManagerRequest extends FormRequest
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'login' => 'required',
            'password' => 'required',
        ];
    }
}
