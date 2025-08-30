<?php

use App\Http\Controllers\ManagerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/getHashedPassword', function (Request $request) {
    return bcrypt($request->password);
});

Route::post('/auth', [ManagerController::class, 'authenticate']);

Route::get('/test', function () {
    return [
        'authenticated' => true
    ];
})->middleware(['auth:manager']);
