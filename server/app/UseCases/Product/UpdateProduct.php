<?php

namespace App\UseCases\Product;

use App\Models\Product;

class UpdateProduct
{
    public function execute(int $id, array $data): void
    {
        $product = Product::findOrFail($id);
        $product->update($data);
    }
}
