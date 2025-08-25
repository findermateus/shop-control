<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriceHistory extends Model
{
    protected $fillable = [
        'product_id',
        'price',
        'discount'
    ];

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
