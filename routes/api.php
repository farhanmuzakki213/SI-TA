<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingControler;
use App\Http\Controllers\Api\PklMhsController;
use App\Http\Controllers\Api\SemproMhsController;
use App\Http\Controllers\Api\TaMhsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('mobile')->group(function () {
    // Auth
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])
        ->middleware(['auth:sanctum', 'throttle:10,1']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('bookings', BookingControler::class);

        Route::prefix('pkl-mahasiswa')->group(function () {
            Route::get('/', [PklMhsController::class, 'index']);
            Route::get('/{id}', [PklMhsController::class, 'show']);
        });

        Route::prefix('sempro-mahasiswa')->group(function () {
            Route::get('/', [SemproMhsController::class, 'index']);
            Route::get('/{id}', [SemproMhsController::class, 'show']);
        });

        Route::prefix('ta-mahasiswa')->group(function () {
            Route::get('/', [TaMhsController::class, 'index']);
            Route::get('/{id}', [TaMhsController::class, 'show']);
        });
    });
});

// Profile (contoh endpoint yang diproteksi)
    /* Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [ProfileController::class, 'show']);
    }); */
