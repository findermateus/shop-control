<?php

namespace App\Models;

use App\Enum\Category;
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

    public function clothesVariants()
    {
        return $this->hasMany(ClothingVariant::class);
    }

    public function toArray(): array
    {
        $result = [
            'id' => $this->id,
            'label' => $this->label,
            'description' => $this->description,
            'category' => $this->category,
            'price' => $this->price,
            'discount' => $this->discount,
            'stock' => $this->stock,
            'active' => $this->active,
            'createdAt' => $this->created_at,
        ];
        if ($this->category == 'Clothing') {
            $result['clothesVariants'] = $this->clothesVariants;
        }
        return $result;
    }
}
