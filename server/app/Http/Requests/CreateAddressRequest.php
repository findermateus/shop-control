<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAddressRequest extends FormRequest
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
        return [
            'customer_id' => ['required', 'integer', 'exists:customers,id'],
            'postal_code' => ['required', 'string', 'max:20', 'regex:/^\d{5}-?\d{3}$/'],
            'street' => ['required', 'string', 'min:1', 'max:255'],
            'neighborhood' => ['required', 'string', 'min:1', 'max:255'],
            'number' => ['required', 'string', 'max:20'],
            'complement' => ['nullable', 'string', 'max:255']
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'O cliente é obrigatório.',
            'customer_id.exists' => 'O cliente selecionado não existe.',
            'postal_code.required' => 'O CEP é obrigatório.',
            'postal_code.regex' => 'O CEP deve ter o formato 12345-678 ou 12345678.',
            'street.required' => 'A rua é obrigatória.',
            'street.min' => 'A rua deve ter pelo menos 1 caractere.',
            'neighborhood.required' => 'O bairro é obrigatório.',
            'neighborhood.min' => 'O bairro deve ter pelo menos 1 caractere.',
            'number.required' => 'O número é obrigatório.'
        ];
    }
}
