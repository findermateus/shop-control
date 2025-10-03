<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use App\UseCases\CreateOrder;

class OrderController extends Controller
{
    public function __construct(private readonly CreateOrder $createOrder)
    {
    }

    public function createOrder(CreateOrderRequest $request)
    {
        $data = $request->validated();
        $order = $this->createOrder->execute($data);
        return new OrderResource($order);
    }
}
