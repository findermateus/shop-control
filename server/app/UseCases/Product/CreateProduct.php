<?php

namespace App\UseCases\Product;

use App\Enum\ClothingSize;
use App\Interfaces\Services\LogServiceInterface;
use App\Models\ClothingVariant;
use App\Models\Product;

readonly class CreateProduct
{
    public function __construct(private LogServiceInterface $logService)
    {
    }

    public function execute(array $data): void
    {
        if ($data['category'] != 'Clothing') {
            $data['stock'] = 0;
        }

        $product = Product::create($data);
        $category = $data['category'];

        if ($category == 'Clothing') {
            $this->createClothingVariants($product->id);
        }

        $this->logService->recordPriceChange($product->id, $product->price);
    }

    private function createClothingVariants(int $productId): void
    {
        foreach (ClothingSize::cases() as $size) {
            ClothingVariant::create([
                'product_id' => $productId,
                'size' => $size,
                'stock' => 0,
            ]);
        }
    }
}
