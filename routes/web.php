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

// Route Super Admin
Route::group(['middleware' => ['role:superAdmin']], function () {
    Route::middleware('auth')->group(function () {
        // Data User
        Route::get('/user', [\App\Http\Controllers\SuperAdmin\UserController::class, 'index'])->name('user');
        Route::put('/user/{id}/update', [\App\Http\Controllers\SuperAdmin\UserController::class, 'update'])->name('user.update');

        // Data Role
        Route::get('/role', [\App\Http\Controllers\SuperAdmin\RoleController::class, 'index'])->name('role');

        // Data Permission
        Route::get('/permission', [\App\Http\Controllers\SuperAdmin\PermissionController::class, 'index'])->name('permission');
    });
});

// Route Mahasiswa
Route::group(['middleware' => ['role:mahasiswa']], function () {
    Route::middleware('auth')->group(function () {
        //PKL
        Route::get('/MhsPkl', [\App\Http\Controllers\Mahasiswa\PklController::class, 'index'])->name('MhsPkl');
        Route::post('/MhsPkl/store', [\App\Http\Controllers\Mahasiswa\PklController::class, 'store'])->name('MhsPkl.store');
        Route::post('/MhsPkl/Ajuan/store', [\App\Http\Controllers\Mahasiswa\PklController::class, 'storeAjuan'])->name('MhsPkl.storeAjuan');
        Route::put('/MhsPkl/{id}/update', [\App\Http\Controllers\Mahasiswa\PklController::class, 'update'])->name('MhsPkl.update');
        Route::delete('/MhsPkl/delete', [\App\Http\Controllers\Mahasiswa\PklController::class, 'destroy'])->name('MhsPkl.destroy');
        Route::post('/MhsPkl/Laporan/store', [\App\Http\Controllers\Mahasiswa\PklController::class, 'storeLaporan'])->name('MhsPklLaporan.store');
        Route::post('/MhsPkl/Laporan/{id}/update', [\App\Http\Controllers\Mahasiswa\PklController::class, 'updateLaporan'])->name('MhsPklLaporan.update');

        //PKL
        Route::get('/MhsSempro', [\App\Http\Controllers\Mahasiswa\SemproController::class, 'index'])->name('MhsSempro');
        Route::post('/MhsSempro/store', [\App\Http\Controllers\Mahasiswa\SemproController::class, 'store'])->name('MhsSempro.store');
        Route::post('/MhsSempro/{id}/update', [\App\Http\Controllers\Mahasiswa\SemproController::class, 'update'])->name('MhsSempro.update');

        // Data Log Book MHS PKL / Laporan MHS PKL
        Route::get('/logbookmhs', [\App\Http\Controllers\Mahasiswa\LogBookMhsController::class, 'index'])->name('logbookmhs');
        Route::post('/logbookmhs/store', [\App\Http\Controllers\Mahasiswa\LogBookMhsController::class, 'store'])->name('logbookmhs.store');
        Route::post('/logbookmhs/{id}/update', [\App\Http\Controllers\Mahasiswa\LogBookMhsController::class, 'update'])->name('logbookmhs.update');
        Route::delete('/logbookmhs/{laporanpkl}/delete', [\App\Http\Controllers\Mahasiswa\LogBookMhsController::class, 'destroy'])->name('logbookmhs.destroy');
        Route::delete('/logbookmhs/destroyMultiple', [\App\Http\Controllers\Mahasiswa\LogBookMhsController::class, 'destroyMultiple'])->name('logbookmhs.destroyMultiple');

        // Data Ajuan Sidang
        Route::get('/ajukansidang', [\App\Http\Controllers\Mahasiswa\AjukanSidangController::class, 'index'])->name('ajukansidang');
        Route::post('/ajukansidang/{id}/update', [\App\Http\Controllers\Mahasiswa\AjukanSidangController::class, 'update'])->name('ajukansidang.update');
        Route::delete('/ajukansidang/{ajukansidang}/delete', [\App\Http\Controllers\Mahasiswa\AjukanSidangController::class, 'destroy'])->name('ajukansidang.destroy');
    });
});

Route::group(['middleware' => ['role:dosenPembimbing|dosenPenguji|pimpinanProdi']], function () {
    Route::middleware('auth')->group(function () {
        // Route Dosen Pembimbing
        Route::group(['middleware' => ['role:dosenPembimbing']], function () {
            // Sempro
            Route::get('/Pembimbing/Mhssempro', [\App\Http\Controllers\Dosen\Pembimbing\MhsSemproController::class, 'index'])->name('MhsSemproPembimbing');
            Route::get('/Pembimbing/Mhssempro/{id}', [\App\Http\Controllers\Dosen\Pembimbing\MhsSemproController::class, 'detail']);

            // PKL
            Route::get('/Pembimbing/Mhspkl', [\App\Http\Controllers\Dosen\Pembimbing\MhsPklController::class, 'index'])->name('MhsPklPembimbing');
            Route::get('/Pembimbing/Mhspkl/{id}', [\App\Http\Controllers\Dosen\Pembimbing\MhsPklController::class, 'detail']);
            Route::put('/Pembimbing/Mhspkl/Laporan/{id}/update', [\App\Http\Controllers\Dosen\Pembimbing\MhsPklController::class, 'updateLaporan'])->name('MhsPklPembimbingLaporan.updateLaporan');
            Route::post('/Pembimbing/Mhspkl/Nilai/store', [\App\Http\Controllers\Dosen\Pembimbing\MhsPklController::class, 'storeNilai'])->name('MhsPklPembimbingLaporan.storeNilai');
            Route::put('/Pembimbing/Mhspkl/Nilai/{id}/update', [\App\Http\Controllers\Dosen\Pembimbing\MhsPklController::class, 'updateNilai'])->name('MhsPklPembimbingLaporan.updateNilai');
        });

        // Route Dosen Penguji
        Route::group(['middleware' => ['role:dosenPenguji']], function () {

            // Sempro
            Route::get('/Penguji/Mhssempro', [\App\Http\Controllers\Dosen\Penguji\MhsSemproController::class, 'index'])->name('MhsSemproPenguji');
            Route::get('/Penguji/Mhssempro/{id}', [\App\Http\Controllers\Dosen\Penguji\MhsSemproController::class, 'detail']);

            // PKL
            Route::get('/Penguji/Mhspkl', [\App\Http\Controllers\Dosen\Penguji\MhsPklController::class, 'index'])->name('MhsPklPenguji');
            Route::get('/Penguji/Mhspkl/{id}', [\App\Http\Controllers\Dosen\Penguji\MhsPklController::class, 'detail']);
            Route::post('/Penguji/Mhspkl/Nilai/store', [\App\Http\Controllers\Dosen\Penguji\MhsPklController::class, 'storeNilai'])->name('MhsPklPengujiLaporan.storeNilai');
            Route::put('/Penguji/Mhspkl/Nilai/{id}/update', [\App\Http\Controllers\Dosen\Penguji\MhsPklController::class, 'updateNilai'])->name('MhsPklPengujiLaporan.updateNilai');
        });

        // Route Kepala Prodi
        Route::group(['middleware' => ['role:pimpinanProdi']], function () {
            // Data Jadwal Ruangan
            Route::get('/booking', [\App\Http\Controllers\Dosen\Kprodi\BookingController::class, 'index'])->name('booking');
            Route::post('/booking/store', [\App\Http\Controllers\Dosen\Kprodi\BookingController::class, 'store'])->name('booking.store');
            Route::put('/booking/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\BookingController::class, 'update'])->name('booking.update');
            Route::delete('/booking/{booking}/delete', [\App\Http\Controllers\Dosen\Kprodi\BookingController::class, 'destroy'])->name('booking.destroy');
            Route::delete('/booking/destroyMultiple', [\App\Http\Controllers\Dosen\Kprodi\BookingController::class, 'destroyMultiple'])->name('booking.destroyMultiple');

            // Data Ruangan
            Route::get('/ruangan', [\App\Http\Controllers\Dosen\Kprodi\RuanganController::class, 'index'])->name('ruangan');
            Route::post('/ruangan/store', [\App\Http\Controllers\Dosen\Kprodi\RuanganController::class, 'store'])->name('ruangan.store');
            Route::put('/ruangan/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\RuanganController::class, 'update'])->name('ruangan.update');
            Route::delete('/ruangan/{ruangan}/delete', [\App\Http\Controllers\Dosen\Kprodi\RuanganController::class, 'destroy'])->name('ruangan.destroy');
            Route::delete('/ruangan/destroyMultiple', [\App\Http\Controllers\Dosen\Kprodi\RuanganController::class, 'destroyMultiple'])->name('ruangan.destroyMultiple');

            // Data Sesi
            Route::get('/sesi', [\App\Http\Controllers\Dosen\Kprodi\SesiController::class, 'index'])->name('sesi');
            Route::post('/sesi/store', [\App\Http\Controllers\Dosen\Kprodi\SesiController::class, 'store'])->name('sesi.store');
            Route::put('/sesi/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\SesiController::class, 'update'])->name('sesi.update');
            Route::delete('/sesi/{sesi}/delete', [\App\Http\Controllers\Dosen\Kprodi\SesiController::class, 'destroy'])->name('sesi.destroy');
            Route::delete('/sesi/destroyMultiple', [\App\Http\Controllers\Dosen\Kprodi\SesiController::class, 'destroyMultiple'])->name('sesi.destroyMultiple');

            // Sempro
            Route::get('/Kprodi/MhsSempro', [\App\Http\Controllers\Dosen\Kprodi\MhsSemproController::class, 'index'])->name('MhsSemproKprodi');
            Route::get('/Kprodi/MhsSempro/{id}', [\App\Http\Controllers\Dosen\Kprodi\MhsSemproController::class, 'detail']);
            Route::put('/Kprodi/MhsSempro/Penugasan/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\MhsSemproController::class, 'updatePenugasan'])->name('MhsSemproKprodi.updatePenugasan');
            Route::post('/Kprodi/Mhssempro/Jadwal/store', [\App\Http\Controllers\Dosen\Kprodi\MhsSemproController::class, 'storeJadwal'])->name('MhsSemproKprodi.storeJadwal');
            Route::put('/Kprodi/Mhssempro/Jadwal/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\MhsSemproController::class, 'updateJadwal'])->name('MhsSemproKprodi.updateJadwal');

            // PKL
            Route::get('/Kprodi/Mhspkl', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'index'])->name('MhsPklKprodi');
            Route::get('/Kprodi/Mhspkl/{id}', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'detail']);
            Route::post('/Kprodi/Mhspkl/store', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'store'])->name('MhsPklKprodi.store');
            Route::put('/Kprodi/Mhspkl/Usulan/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'updateUsulan'])->name('MhsPklKprodi.updateUsulan');
            Route::put('/Kprodi/Mhspkl/Pkl/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'updatePkl'])->name('MhsPklKprodi.updatePkl');
            Route::post('/Kprodi/Mhspkl/Jadwal/store', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'storeJadwal'])->name('MhsPklKprodi.storeJadwal');
            Route::put('/Kprodi/Mhspkl/Jadwal/{id}/update', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'updateJadwal'])->name('MhsPklKprodi.updateJadwal');
            Route::delete('/Kprodi/Mhspkl/{mhspkl}/delete', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'destroy'])->name('MhsPklKprodi.destroy');
            Route::delete('/Kprodi/Mhspkl/destroyMultiple', [\App\Http\Controllers\Dosen\Kprodi\MhspklController::class, 'destroyMultiple'])->name('MhsPklKprodi.destroyMultiple');
        });

        // Surat Tugas
        Route::get('/SuratTugas/Pkl/{id}', [\App\Http\Controllers\SuratTugasController::class, 'pkl']);
    });
});



// Route Admin
Route::group(['middleware' => ['role:admin']], function () {
    // Data Master : Dosen, Mahasiswa, Jurusan, Prodi, Kelas, Semester dan Tahun Akademik, Jabatan Pimpinan, Ruangan dan Sesi
    Route::middleware('auth')->group(function () {
        // Persetujuan Sidang PKL
        Route::get('/usulansidangpkl', [\App\Http\Controllers\Admin\UsulanSidangPklController::class, 'index'])->name('usulansidangpkl');
        Route::put('/usulansidangpkl/{id}/update', [\App\Http\Controllers\Admin\UsulanSidangPklController::class, 'update'])->name('usulansidangpkl.update');

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

        // Data Pimpinan Jurusan
        Route::get('/pimpinan', [\App\Http\Controllers\Admin\PimpinanController::class, 'index'])->name('pimpinan');
        Route::post('/pimpinan/store', [\App\Http\Controllers\Admin\PimpinanController::class, 'store'])->name('pimpinan.store');
        Route::put('/pimpinan/{id}/update', [\App\Http\Controllers\Admin\PimpinanController::class, 'update'])->name('pimpinan.update');
        Route::delete('/pimpinan/{pimpinan}/delete', [\App\Http\Controllers\Admin\PimpinanController::class, 'destroy'])->name('pimpinan.destroy');
        Route::delete('/pimpinan/destroyMultiple', [\App\Http\Controllers\Admin\PimpinanController::class, 'destroyMultiple'])->name('pimpinan.destroyMultiple');
    });
});

require __DIR__ . '/auth.php';
