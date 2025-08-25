<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'label',
        'description',
        'category',
        'price',
        'discount',
        'stock',
        'active'
    ];

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'description' => $this->description,
            'category' => $this->category,
            'price' => $this->price,
            'discount' => $this->discount,
            'stock' => $this->stock,
            'active' => $this->active,
            'createdAt' => $this->created_at
        ];
    }
}
