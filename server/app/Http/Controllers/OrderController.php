<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use App\UseCases\CreateOrder;
use App\UseCases\GetAllOrders;

class OrderController extends Controller
{
    public function __construct(private readonly CreateOrder $createOrder, private readonly GetAllOrders $getAllOrders)
    {
    }

    public function createOrder(CreateOrderRequest $request)
    {
        $data = $request->validated();
        $order = $this->createOrder->execute($data);
        return new OrderResource($order);
    }

    public function getAllOrders()
    {
        return $this->getAllOrders->execute();
    }
}
