<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Membuat peran secara otomatis jika belum ada
        $roles = ['pimpinanJurusan', 'dosenPembimbing', 'pimpinanProdi', 'dosenPenguji', 'superAdmin', 'mahasiswa', 'admin'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Fungsi untuk mengambil email dari nama depan
        function generateEmail($name)
        {
            $firstName = explode(' ', trim($name))[0]; // Ambil nama pertama
            return strtolower($firstName) . '@example.com'; // Membuat email dengan nama pertama
        }

        // Mengaitkan peran dengan pengguna secara otomatis
        $adminUser = User::firstOrCreate(
            ['email' => generateEmail('Admin')],
            ['name' => 'Admin User', 'password' => Hash::make('12345678')]
        );
        $adminUser->assignRole('admin');

        $superAdminUser = User::firstOrCreate(
            ['email' => generateEmail('SuperAdmin')],
            ['name' => 'Super Admin', 'password' => Hash::make('12345678')]
        );
        $superAdminUser->assignRole('superAdmin');

        // Data dosen yang akan dibuat
        $dosenData = [
            [14, 2, 'ALDO ERIANDA, M.T, S.ST', '003078904', 'Laki-laki', '1'],
            [40, 2, 'CIPTO PRABOWO, S.T, M.T', '0002037410', 'Laki-laki', '1'],
            [46, 2, 'DEDDY PRAYAMA, S.Kom, M.ISD', '0015048105', 'Laki-laki', '1'],
            [50, 2, 'DEFNI, S.Si, M.Kom', '0007128104', 'Perempuan', '1'],
            [52, 2, 'DENI SATRIA, S.Kom, M.Kom', '0028097803', 'Laki-laki', '1'],
            [66, 2, 'DWINY MEIDELFI, S.Kom, M.Cs', '0009058601', 'Perempuan', '1'],
            [85, 2, 'ERVAN ASRI, S.Kom, M.Kom', '0001097802', 'Laki-laki', '1'],
        ];

        // Membuat data dosen dan mengisi 'user_id' secara otomatis
        foreach ($dosenData as $data) {
            $user = User::firstOrCreate(
                ['email' => generateEmail($data[2])],
                ['name' => $data[2], 'password' => Hash::make('password')]
            );

            Dosen::updateOrCreate(
                ['id_dosen' => $data[0]],
                [
                    'user_id' => $user->id,
                    'prodi_id' => $data[1],
                    'nama_dosen' => $data[2],
                    'nidn_dosen' => $data[3],
                    'gender' => $data[4],
                    'status_dosen' => $data[5]
                ]
            );
        }

        // Data mahasiswa yang akan dibuat
        $data_mahasiswa = [
            [1, 1, '1701091031', 'Wara Ulan Saputri', 'perempuan', '1'],
            [2, 1, '1701081035', 'Silvia Angraini', 'perempuan', '1'],
            [3, 1, '1701091033', 'Dea Annona Prayetno Putri', 'perempuan', '1'],
            [4, 1, '1701091018', 'Yulia Ramadhani', 'perempuan', '1'],
            [6, 1, '1701081027', 'Syahrul Gusti Hafendi', 'laki-laki', '1'],
            [7, 1, '1701082019', 'Rendhika Aditya', 'laki-laki', '1'],
        ];

        // Membuat data mahasiswa dan mengisi 'user_id' secara otomatis
        foreach ($data_mahasiswa as $data) {
            $user = User::firstOrCreate(
                ['email' => generateEmail($data[3])],
                ['name' => $data[3], 'password' => Hash::make('password')]
            );
            $user->assignRole('mahasiswa');

            DB::table('mahasiswas')->updateOrInsert(
                ['id_mahasiswa' => $data[0]],
                [
                    'user_id' => $user->id,
                    'kelas_id' => $data[1],
                    'nim_mahasiswa' => $data[2],
                    'nama_mahasiswa' => $data[3],
                    'gender' => $data[4],
                    'status_mahasiswa' => $data[5]
                ]
            );
        }

        $PJData = [
            [1, 1, 40, '2022-2026', '1'],
            [2, 2, 46, '2022-2026', '1'],
            [3, 3, 50, '2022-2026', '1'],
            [4, 3, 52, '2022-2026', '1'],
            [5, 3, 66, '2022-2026', '1'],
        ];

        foreach ($PJData as $data) {
            DB::table('pimpinans')->insert([
                'id_pimpinan' => $data[0],
                'jabatan_pimpinan_id' => $data[1],
                'dosen_id' => $data[2],
                'periode' => $data[3],
                'status_pimpinan' => $data[4]
            ]);
        }

        $kajurUserIds = Pimpinan::with('r_dosen')->whereIn('jabatan_pimpinan_id', [1, 2])->get()->pluck('r_dosen.user_id')->toArray();
        $kaprodiUserIds = Pimpinan::with('r_dosen')->where('jabatan_pimpinan_id', 3)->get()->pluck('r_dosen.user_id')->toArray();

        foreach ($kajurUserIds as $user_id) {
            $user = User::find($user_id);
            if ($user) {
                $user->assignRole('pimpinanJurusan');
            }
        }

        foreach ($kaprodiUserIds as $user_id) {
            $user = User::find($user_id);
            if ($user) {
                $user->assignRole('pimpinanProdi');
            }
        }
    }
}
