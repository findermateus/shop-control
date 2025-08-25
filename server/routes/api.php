<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function (Request $request) {
    $user = new User();
    $user->createToken('user-token');
    return 'E-commerce Equina Geek API';
});

Route::get('/auth', fn(Request $request) => 'authenticated')->middleware('auth:sanctum');
