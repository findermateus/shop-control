<?php

namespace App\Models;

use App\Enum\OrderStatus;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'order_code',
        'address_id',
        'status',
        'total_amount'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'status' => OrderStatus::class
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
                    ->withPivot('quantity', 'unit_price', 'total_price', 'clothes_variant_id')
                    ->withTimestamps();
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'order_code' => $this->order_code,
            'address_id' => $this->address_id,
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'customer' => $this->customer,
            'address' => $this->address,
            'order_items' => $this->orderItems
        ];
    }
}
