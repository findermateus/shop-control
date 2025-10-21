<?php

namespace App\UseCases\Order;

use App\Models\Order;

class GetAllOrders
{
    public function execute(): array
    {
        return Order::all()->load(['customer', 'address'])->toArray();
    }
}
