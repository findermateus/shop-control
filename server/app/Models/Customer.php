<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'cellphone',
        'oauth_provider',
        'oauth_provider_id'
    ];

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function primaryAddress()
    {
        return $this->hasOne(Address::class)->oldest();
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'cellphone' => $this->cellphone,
            'oauth_provider' => $this->oauth_provider,
            'oauth_provider_id' => $this->oauth_provider_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'addresses' => $this->addresses
        ];
    }
}
