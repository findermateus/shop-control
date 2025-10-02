<?php

namespace App\Services;

use App\Models\PriceHistory;
use App\Models\StockHistory;

class LogService
{
    public static function recordPriceChange($productId, $newPrice)
    {
        PriceHistory::create([
            'product_id' => $productId,
            'price' => $newPrice
        ]);
    }

    public static function recordStockChange($productId, $newStock, $quantityChanged, $managerId, $justification, $clothingVariantId = null)
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
