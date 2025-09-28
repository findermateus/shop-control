<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockHistory extends Model
{
    protected $fillable = [
        'justification',
        'stock',
        'quantity_changed',
        'product_id',
        'clothing_variant_id',
        'manager_id',
    ];

    protected $casts = [
        'stock' => 'integer',
        'quantity_changed' => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function clothingVariant(): BelongsTo
    {
        return $this->belongsTo(ClothingVariant::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(Manager::class);
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'justification' => $this->justification,
            'stock' => $this->stock,
            'quantityChanged' => $this->quantity_changed,
            'productId' => $this->product_id,
            'clothingVariantId' => $this->clothing_variant_id,
            'managerId' => $this->manager_id,
            'date' => $this->created_at,
        ];
    }
}
