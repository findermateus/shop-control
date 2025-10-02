<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MercadoPagoController; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/password', function (Request $request) {
    return bcrypt($request->password);
});

Route::post('/auth', [ManagerController::class, 'authenticate']);

Route::get('/user', [ManagerController::class, 'getUser'])->middleware('auth:manager');

Route::middleware('auth:manager')->prefix('/products')->group(function () {
    Route::post('', [ProductController::class, 'createProduct']);
    Route::put('/{id}', [ProductController::class, 'updateProduct']);
    Route::get('', [ProductController::class, 'getProducts']);
    Route::get('/{id}', [ProductController::class, 'getProductById']);
    Route::patch('/{id}/disable', [ProductController::class, 'disableProduct']);
    Route::patch('/{id}/enable', [ProductController::class, 'enableProduct']);
    Route::patch('/{id}/price', [ProductController::class, 'updateProductPrice']);
    Route::patch('/{id}/stock', [ProductController::class, 'updateProductStock']);
});

Route::middleware('auth:manager')->prefix('/addresses')->group(function () {
    Route::get('', [AddressController::class, 'index']);
    Route::post('', [AddressController::class, 'store']);
    Route::get('/{address}', [AddressController::class, 'show']);
    Route::put('/{address}', [AddressController::class, 'update']);
    Route::delete('/{address}', [AddressController::class, 'destroy']);
});

Route::middleware('auth:manager')->prefix('/customers')->group(function () {
    Route::get('', [CustomerController::class, 'index']);
    Route::post('', [CustomerController::class, 'store']);
    Route::get('/{customer}', [CustomerController::class, 'show']);
    Route::put('/{customer}', [CustomerController::class, 'update']);
    Route::delete('/{customer}', [CustomerController::class, 'destroy']);
    Route::post('/{customer}/addresses', [CustomerController::class, 'createAddress']);
});

Route::post('/criar-pagamento', [MercadoPagoController::class, 'criarPagamento']);