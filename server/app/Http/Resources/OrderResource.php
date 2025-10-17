<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'code'        => $this->order_code,
            'status'      => $this->status,
            'total'       => $this->total_amount,
            'customer'    => [
                'id'    => $this->customer->id,
                'name'  => $this->customer->name,
                'email' => $this->customer->email,
            ],
            'address'     => [
                'id'       => $this->address->id,
                'street'   => $this->address->street,
                'number'   => $this->address->number,
                'city'     => $this->address->city,
                'state'    => $this->address->state,
                'zip_code' => $this->address->zip_code,
            ],
            'products'    => $this->products->map(function ($product) {
                return [
                    'id'          => $product->id,
                    'name'        => $product->name,
                    'quantity'    => $product->pivot->quantity,
                    'unit_price'  => $product->pivot->unit_price,
                    'total_price' => $product->pivot->total_price,
                    'variant_id'  => $product->pivot->clothes_variant_id,
                ];
            }),
            'created_at'  => $this->created_at->format('d/m/Y H:i'),
        ];
    }
}
