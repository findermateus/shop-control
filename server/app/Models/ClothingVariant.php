<?php

namespace App\Models;

use App\Enum\ClothingSize;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClothingVariant extends Model
{
    use HasFactory;

    protected $table = 'clothes_variants';

    protected $fillable = [
        'product_id',
        'size',
        'stock',
    ];

    protected $casts = [
        'size' => ClothingSize::class,
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function stockHistories()
    {
        return $this->hasMany(StockHistory::class, 'clothing_variant_id');
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'size' => $this->size,
            'stock' => $this->stock,
            'stockHistories' => $this->stockHistories,
        ];
    }
}
