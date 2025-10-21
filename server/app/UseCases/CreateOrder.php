<?php

namespace App\UseCases;

use App\Exceptions\NotEnoughStockException;
use App\Models\ClothingVariant;
use App\Models\Order;
use App\Models\Product;
use App\Services\LogService;
use Illuminate\Support\Facades\DB;

class CreateOrder
{
    public function execute(array $data): Order
    {
        $order = null;
        DB::transaction(function () use ($data, &$order) {
            $order = $this->processOrder($data);
        });
        return $order;
    }

    private function processOrder(array $data): Order
    {
        $orderCode = 'ORD-' . strtoupper(uniqid());
        $order = Order::create([
            'customer_id' => $data['customer_id'],
            'order_code' => $orderCode,
            'address_id' => $data['address_id'],
            'status' => 'pending',
            'total_amount' => 0
        ]);
        $totalAmount = 0;
        foreach ($data['products'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $stock = $this->saveOrder($item, $product);

            LogService::recordStockChange(
                $item['product_id'],
                $stock,
                $item['quantity'],
                null,
                'Order placed',
                $item['clothes_variant_id']
            );
            $productTotalPrice = $product->price * $item['quantity'];
            $totalAmount += $productTotalPrice;
            $order->products()->attach($item['product_id'], [
                'quantity' => $item['quantity'],
                'unit_price' => $product->price,
                'total_price' => $productTotalPrice,
                'clothes_variant_id' => $item['clothes_variant_id'] ?? null
            ]);
        }

        $order->total_amount = $totalAmount;
        $order->save();

        return $order;
    }

    private function saveOrder(array $item, Product $product): int
    {
        if (empty($item['clothes_variant_id'])) {
            if ($product->stock < $item['quantity']) {
                throw new NotEnoughStockException();
            }

            $product->stock -= $item['quantity'];
            $product->save();

            return $product->stock;
        }

        $variant = ClothingVariant::findOrFail($item['clothes_variant_id']);

        if ($variant->stock < $item['quantity']) {
            throw new NotEnoughStockException();
        }

        $variant->stock -= $item['quantity'];
        $variant->save();

        return $variant->stock;
    }
}
