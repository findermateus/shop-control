<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $customerId = $this->route('customer')->id ?? null;
        
        return [
            'name' => ['sometimes', 'required', 'string', 'min:1', 'max:255'],
            'email' => [
                'sometimes', 
                'required', 
                'email', 
                'max:255',
                Rule::unique('customers')->ignore($customerId)->where(function ($query) {
                    return $query->where('oauth_provider', $this->oauth_provider ?? $this->route('customer')->oauth_provider);
                })
            ],
            'cellphone' => ['nullable', 'string', 'max:20'],
            'oauth_provider' => ['sometimes', 'required', 'string', 'in:google,facebook,github'],
            'oauth_provider_id' => ['nullable', 'string', 'max:255']
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.min' => 'O nome deve ter pelo menos 1 caractere.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email deve ter um formato válido.',
            'email.unique' => 'Este email já está sendo usado para este provedor OAuth.',
            'oauth_provider.required' => 'O provedor OAuth é obrigatório.',
            'oauth_provider.in' => 'O provedor OAuth deve ser: google, facebook ou github.'
        ];
    }
}
