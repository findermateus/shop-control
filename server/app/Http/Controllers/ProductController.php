<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeProductPriceRequest;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\UpdateProductStockRequest;
use App\Models\Product;
use App\UseCases\Product\ChangeProductPrice;
use App\UseCases\Product\ChangeProductStatus;
use App\UseCases\Product\ChangeProductStock;
use App\UseCases\Product\CreateProduct;
use App\UseCases\Product\UpdateProduct;

class ProductController extends Controller
{
    public function __construct(
        private readonly CreateProduct       $createProduct,
        private readonly UpdateProduct       $updateProduct,
        private readonly ChangeProductStatus $changeProductStatus,
        private readonly ChangeProductPrice  $changeProductPrice,
        private readonly ChangeProductStock  $changeProductStock
    )
    {
    }

    public function createProduct(CreateProductRequest $request)
    {
        $this->createProduct->execute($request->validated());

        return response()->json(['message' => 'Product created successfully'], 201);
    }

    public function updateProduct(int $id, UpdateProductRequest $request)
    {
        $data = $request->validated();
        $this->updateProduct->execute($id, $data);

        return response()->json(['message' => 'Product updated successfully']);
    }

    public function getProducts()
    {
        return response()->json(Product::all());
    }

    public function getProductById(int $id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product);
    }

    public function disableProduct(int $id)
    {
        $this->changeProductStatus->execute($id, false);

        return response()->json(['message' => 'Product disabled successfully']);
    }

    public function enableProduct(int $id)
    {
        $this->changeProductStatus->execute($id, true);

        return response()->json(['message' => 'Product enabled successfully']);
    }

    public function updateProductPrice(int $id, ChangeProductPriceRequest $request)
    {
        $data = $request->validated();
        $newPrice = $data['price'];
        $this->changeProductPrice->execute($id, $newPrice);

        return response()->json(['message' => 'Product price updated successfully']);
    }

    public function updateProductStock(int $id, UpdateProductStockRequest $request)
    {
        $data = $request->validated();
        $value = $data['value'];
        $clothingVariantId = $data['clothingVariantId'] ?? null;
        $this->changeProductStock->execute($id, $value, $clothingVariantId);

        return response()->json(['message' => 'Product stock updated successfully']);
    }
}
