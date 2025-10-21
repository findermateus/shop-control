<?php

namespace App\Interfaces\Services;

interface LogServiceInterface
{
    public function recordPriceChange(int $productId, float $newPrice): void;

    public function recordStockChange(
        int    $productId,
        int    $newStock,
        int    $quantityChanged,
        ?int   $managerId,
        string $justification,
        ?int   $clothingVariantId = null
    ): void;
}
