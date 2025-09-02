<?php

namespace App\Http\Controllers;

use App\Exceptions\ProductNotFoundException;
use App\Http\Requests\ChangeProductPriceRequest;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\PriceHistory;
use App\Models\Product;

class ProductController extends Controller
{
    public function createProduct(CreateProductRequest $request)
    {
        $data = $request->validated();
        $product = Product::create($data);
        PriceHistory::create([
            'product_id' => $product->id,
            'price' => $product->price
        ]);
        return response()->json(['message' => 'Product created successfully'], 201);
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
        return response()->json($products->map->toArray());
    }

    public function getProductById(int $id)
    {
        $product = Product::find($id);
        if (! $product) {
            throw new ProductNotFoundException();
        }
        $cleanProduct = $product->toArray();
        $priceHistories = PriceHistory::where('product_id', $id)->get()->map(function ($history) {
            return [
                'price' => $history->price,
                'changedAt' => $history->created_at
            ];
        });
        $cleanProduct['priceHistory'] = $priceHistories;
        return response()->json($cleanProduct);
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
