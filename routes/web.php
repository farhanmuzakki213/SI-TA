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
});
// Data Master
Route::middleware('auth')->group(function () {
    // Data Dosen
    Route::get('/dosen', [\App\Http\Controllers\Admin\DosenController::class, 'index'])->name('dosen');
    Route::post('/dosen/store', [\App\Http\Controllers\Admin\DosenController::class, 'store'])->name('dosen.store');
    Route::put('/dosen/{id}/update', [\App\Http\Controllers\Admin\DosenController::class, 'update'])->name('dosen.update');
    Route::delete('/dosen/{dosen}/delete', [\App\Http\Controllers\Admin\DosenController::class, 'destroy'])->name('dosen.destroy');
    Route::delete('/dosen/destroyMultiple', [\App\Http\Controllers\Admin\DosenController::class, 'destroyMultiple'])->name('dosen.destroyMultiple');

    // Data Mahasiswa
    Route::get('/mahasiswa', [\App\Http\Controllers\Admin\MahasiswaController::class, 'index'])->name('mahasiswa');
    Route::post('/mahasiswa/store', [\App\Http\Controllers\Admin\MahasiswaController::class, 'store'])->name('mahasiswa.store');
    Route::put('/mahasiswa/{id}/update', [\App\Http\Controllers\Admin\MahasiswaController::class, 'update'])->name('mahasiswa.update');
    Route::delete('/mahasiswa/{mahasiswa}/delete', [\App\Http\Controllers\Admin\MahasiswaController::class, 'destroy'])->name('mahasiswa.destroy');
    Route::delete('/mahasiswa/destroyMultiple', [\App\Http\Controllers\Admin\MahasiswaController::class, 'destroyMultiple'])->name('mahasiswa.destroyMultiple');

    // Data Jurusan
    Route::get('/jurusan', [\App\Http\Controllers\Admin\JurusanController::class, 'index'])->name('jurusan');
    Route::post('/jurusan/store', [\App\Http\Controllers\Admin\JurusanController::class, 'store'])->name('jurusan.store');
    Route::put('/jurusan/{id}/update', [\App\Http\Controllers\Admin\JurusanController::class, 'update'])->name('jurusan.update');
    Route::delete('/jurusan/{jurusan}/delete', [\App\Http\Controllers\Admin\JurusanController::class, 'destroy'])->name('jurusan.destroy');
    Route::delete('/jurusan/destroyMultiple', [\App\Http\Controllers\Admin\JurusanController::class, 'destroyMultiple'])->name('jurusan.destroyMultiple');

    // Data Prodi
    Route::get('/prodi', [\App\Http\Controllers\Admin\ProdiController::class, 'index'])->name('prodi');
    Route::post('/prodi/store', [\App\Http\Controllers\Admin\ProdiController::class, 'store'])->name('prodi.store');
    Route::put('/prodi/{id}/update', [\App\Http\Controllers\Admin\ProdiController::class, 'update'])->name('prodi.update');
    Route::delete('/prodi/{prodi}/delete', [\App\Http\Controllers\Admin\ProdiController::class, 'destroy'])->name('prodi.destroy');
    Route::delete('/prodi/destroyMultiple', [\App\Http\Controllers\Admin\ProdiController::class, 'destroyMultiple'])->name('prodi.destroyMultiple');

    // Data Kelas
    Route::get('/kelas', [\App\Http\Controllers\Admin\KelasController::class, 'index'])->name('kelas');
    Route::post('/kelas/store', [\App\Http\Controllers\Admin\KelasController::class, 'store'])->name('kelas.store');
    Route::put('/kelas/{id}/update', [\App\Http\Controllers\Admin\KelasController::class, 'update'])->name('kelas.update');
    Route::delete('/kelas/{kelas}/delete', [\App\Http\Controllers\Admin\KelasController::class, 'destroy'])->name('kelas.destroy');
    Route::delete('/kelas/destroyMultiple', [\App\Http\Controllers\Admin\KelasController::class, 'destroyMultiple'])->name('kelas.destroyMultiple');

    // Data Semester dan Tahun Akademik
    Route::get('/semester', [\App\Http\Controllers\Admin\SmtThnakdController::class, 'index'])->name('semester');
    Route::post('/semester/store', [\App\Http\Controllers\Admin\SmtThnakdController::class, 'store'])->name('semester.store');
    Route::put('/semester/{id}/update', [\App\Http\Controllers\Admin\SmtThnakdController::class, 'update'])->name('semester.update');
    Route::delete('/semester/{smt_thnakd}/delete', [\App\Http\Controllers\Admin\SmtThnakdController::class, 'destroy'])->name('semester.destroy');
    Route::delete('/semester/destroyMultiple', [\App\Http\Controllers\Admin\SmtThnakdController::class, 'destroyMultiple'])->name('semester.destroyMultiple');

    // Data Jabatan Pimpinan
    Route::get('/jabatanpimpinan', [\App\Http\Controllers\Admin\JabatanPimpinanController::class, 'index'])->name('jabatanpimpinan');
    Route::post('/jabatanpimpinan/store', [\App\Http\Controllers\Admin\JabatanPimpinanController::class, 'store'])->name('jabatanpimpinan.store');
    Route::put('/jabatanpimpinan/{id}/update', [\App\Http\Controllers\Admin\JabatanPimpinanController::class, 'update'])->name('jabatanpimpinan.update');
    Route::delete('/jabatanpimpinan/{jabatan_pimpinan}/delete', [\App\Http\Controllers\Admin\JabatanPimpinanController::class, 'destroy'])->name('jabatanpimpinan.destroy');
    Route::delete('/jabatanpimpinan/destroyMultiple', [\App\Http\Controllers\Admin\JabatanPimpinanController::class, 'destroyMultiple'])->name('jabatanpimpinan.destroyMultiple');
});

require __DIR__ . '/auth.php';
