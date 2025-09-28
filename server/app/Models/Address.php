<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'customer_id',
        'postal_code',
        'street',
        'neighborhood',
        'number',
        'complement'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'postal_code' => $this->postal_code,
            'street' => $this->street,
            'neighborhood' => $this->neighborhood,
            'number' => $this->number,
            'complement' => $this->complement,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
