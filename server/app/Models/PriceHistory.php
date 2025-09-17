<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PriceHistory extends Model
{
    protected $fillable = [
        'product_id',
        'price',
        'discount'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'productId' => $this->product_id,
            'price' => $this->price,
            'discount' => $this->discount,
            'date' => $this->created_at
        ];
    }
}
