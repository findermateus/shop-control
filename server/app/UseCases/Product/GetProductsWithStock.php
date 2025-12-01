<?php

namespace App\UseCases\Product;

use App\Models\Product;
use Illuminate\Support\Collection;

class GetProductsWithStock
{
    public function execute(): Collection
    {
        return Product::where(function ($query) {
            $query->whereHas('clothesVariants', fn($q) => $q->where('stock', '>', 0))
                ->orWhere(function ($q) {
                    $q->whereDoesntHave('clothesVariants')
                        ->where('stock', '>', 0);
                });
        })->get();
    }
}
