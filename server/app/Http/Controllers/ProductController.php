<?php

namespace App\Http\Controllers;

use App\Enum\ClothingSize;
use App\Exceptions\ProductNotFoundException;
use App\Http\Requests\ChangeProductPriceRequest;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\ClothingVariant;
use App\Models\PriceHistory;
use App\Models\Product;

class ProductController extends Controller
{
    public function createProduct(CreateProductRequest $request)
    {
        $data = $request->validated();
        $product = Product::create($data);
        $category = $data['category'];
        if ($category == 'Clothing') {
            $this->createClothingVariants($product->id);
        }
        PriceHistory::create([
            'product_id' => $product->id,
            'price' => $product->price
        ]);
        return response()->json(['message' => 'Product created successfully'], 201);
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

    public function updateProduct(int $id, UpdateProductRequest $request)
    {
        $product = Product::find($id);
        if (! $product) {
            throw new ProductNotFoundException();
        }
        $data = $request->validated();
        $product->update($data);
        return response()->json(['message' => 'Product updated successfully']);
    }

    public function getProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function getProductById(int $id)
    {
        $product = Product::find($id);
        if (! $product) {
            throw new ProductNotFoundException();
        }
        return response()->json($product);
    }

    public function disableProduct(int $id)
    {
        $product = Product::find($id);
        if (! $product) {
            throw new ProductNotFoundException();
        }
        $product->active = false;
        $product->save();
        return response()->json(['message' => 'Product disabled successfully']);
    }

    public function enableProduct(int $id)
    {
        $product = Product::find($id);
        if (! $product) {
            throw new ProductNotFoundException();
        }
        $product->active = true;
        $product->save();
        return response()->json(['message' => 'Product enabled successfully']);
    }

    public function updateProductPrice(int $id, ChangeProductPriceRequest $request)
    {
        $product = Product::find($id);
        if (! $product) {
            throw new ProductNotFoundException();
        }
        $data = $request->validated();
        $product->price = $data['price'];
        $product->save();
        PriceHistory::create([
            'product_id' => $product->id,
            'price' => $product->price
        ]);
        return response()->json(['message' => 'Product price updated successfully']);
    }
}
