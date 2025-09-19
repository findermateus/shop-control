<?php

use App\Http\Controllers\ManagerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MercadoPagoController; // Adicionado
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
});

// Rota adicionada para o Mercado Pago
Route::post('/criar-pagamento', [MercadoPagoController::class, 'criarPagamento']);