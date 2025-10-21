<?php

namespace App\UseCases\Product;

use App\Interfaces\Services\LogServiceInterface;
use App\Models\Product;

readonly class ChangeProductStock
{
    public function __construct(private LogServiceInterface $logService)
    {
    }

    public function execute(int $id, int $value, ?int $clothingVariantId = null): void
    {
        $product = Product::findOrFail($id);

        if (!is_numeric($clothingVariantId)) {
            $product->stock += $value;
            $product->save();
            $this->logService->recordStockChange($product->id, $product->stock, $value, auth()->id(), 'Stock changed via manager panel');

            return;
        }

        $variant = $product->clothesVariants()->where('id', $clothingVariantId)->firstOrFail();
        $variant->stock += $value;
        $variant->save();

        $this->logService->recordStockChange($product->id, $variant->stock, $value, auth()->id(), 'Stock changed via manager panel', $variant->id);
    }
}
