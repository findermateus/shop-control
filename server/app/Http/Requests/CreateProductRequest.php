<?php

namespace App\Http\Requests;

use App\Enum\Category;
use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'min:1'],
            'description' => ['required', 'string', 'min:1'],
            'category' => [
                'required',
                'string',
                'in:' . implode(',', array_map(fn($c) => $c->name, Category::cases()))
            ],
            'price' => ['required', 'numeric', 'min:0']
        ];
    }
}
