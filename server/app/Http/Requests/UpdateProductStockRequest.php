<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductStockRequest extends FormRequest
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'value' => ['required',  'integer'],
            'clothingVariantId' => ['nullable', 'integer']
        ];
    }
}
