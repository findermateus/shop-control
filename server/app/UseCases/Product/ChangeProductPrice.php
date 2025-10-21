<?php

namespace App\UseCases\Product;

use App\Interfaces\Services\LogServiceInterface;
use App\Models\Product;

readonly class ChangeProductPrice
{
    public function __construct(private LogServiceInterface $logService)
    {
    }

    public function execute(int $id, float $newPrice): void
    {
        $product = Product::findOrFail($id);
        $product->price = $newPrice;
        $product->save();
        $this->logService->recordPriceChange($product->id, $product->price);
    }
}
