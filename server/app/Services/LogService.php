<?php

namespace App\Services;

use App\Interfaces\Services\LogServiceInterface;
use App\Models\PriceHistory;
use App\Models\StockHistory;

class LogService implements LogServiceInterface
{
    public function recordPriceChange(int $productId, float $newPrice): void
    {
        PriceHistory::create([
            'product_id' => $productId,
            'price' => $newPrice
        ]);
    }

    public function recordStockChange(
        int    $productId,
        int    $newStock,
        int    $quantityChanged,
        ?int   $managerId,
        string $justification,
        ?int   $clothingVariantId = null
    ): void
    {
        StockHistory::create([
            'product_id' => $productId,
            'clothing_variant_id' => $clothingVariantId,
            'stock' => $newStock,
            'quantity_changed' => $quantityChanged,
            'manager_id' => $managerId,
            'justification' => $justification
        ]);
    }
}
