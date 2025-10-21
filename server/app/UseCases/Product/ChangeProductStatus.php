<?php

namespace App\UseCases\Product;

use App\Models\Product;

class ChangeProductStatus
{
    public function execute(int $id, bool $status): void
    {
        $product = Product::findOrFail($id);
        $product->active = $status;
        $product->save();
    }
}
