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

    public function priceHistories()
    {
        return $this->hasMany(PriceHistory::class);
    }

    public function stockHistories()
    {
        return $this->hasMany(StockHistory::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
                    ->withPivot('quantity', 'unit_price', 'total_price', 'clothes_variant_id')
                    ->withTimestamps();
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
            'priceHistories' => $this->priceHistories
        ];
        if ($this->category == 'Clothing') {
            $result['clothesVariants'] = $this->clothesVariants;
        } else {
            $result['stockHistories'] = $this->stockHistories;
        }
        return $result;
    }
}
