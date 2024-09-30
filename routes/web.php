<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/uikit/button', function () {
        return Inertia::render('main/uikit/button/page');
    })->name('button');

    Route::get('/uikit/chart', function () {
        return Inertia::render('main/uikit/charts/index');
    })->name('chart');

    Route::get('/uikit/file', function () {
        return Inertia::render('main/uikit/file/index');
    })->name('file');

    Route::get('/uikit/table', function () {
        return Inertia::render('main/uikit/table/index');
    })->name('table');
});
Route::middleware('auth')->group(function () {
    Route::get('/dosen', [\App\Http\Controllers\Admin\DosenController::class, 'index'])->name('dosen');
    Route::post('/dosen/store', [\App\Http\Controllers\Admin\DosenController::class, 'store'])->name('dosen.store');
    Route::put('/dosen/{id}/update', [\App\Http\Controllers\Admin\DosenController::class, 'update'])->name('dosen.update');
    Route::delete('/dosen/{dosen}/delete', [\App\Http\Controllers\Admin\DosenController::class, 'destroy'])->name('dosen.destroy');
    Route::delete('/dosen/destroyMultiple', [\App\Http\Controllers\Admin\DosenController::class, 'destroyMultiple'])->name('dosen.destroyMultiple');
});


require __DIR__ . '/auth.php';
