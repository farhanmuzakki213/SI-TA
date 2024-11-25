<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Prodi;

class ProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prodiData = [
            ['id_prodi' => 35, 'jurusan_id' => 7, 'kode_prodi' => '3MI', 'nama_prodi' => 'Manajemen Informatika D-3'],
            ['id_prodi' => 38, 'jurusan_id' => 7, 'kode_prodi' => '3TK', 'nama_prodi' => 'Teknik Komputer D-3'],
            ['id_prodi' => 42, 'jurusan_id' => 7, 'kode_prodi' => '4TRPL', 'nama_prodi' => 'Teknologi Rekayasa Perangkat Lunak'],
            ['id_prodi' => 37, 'jurusan_id' => 7, 'kode_prodi' => '3SI-TD', 'nama_prodi' => 'D-3 SISTEM INFORMASI (TANAH DATAR)'],
            ['id_prodi' => 39, 'jurusan_id' => 7, 'kode_prodi' => '3TK-SS', 'nama_prodi' => 'D-3 Teknik Komputer (Solok Selatan)'],
            ['id_prodi' => 36, 'jurusan_id' => 7, 'kode_prodi' => '3MI-P', 'nama_prodi' => 'Manajemen Informatika (Pelalawan)'],
            ['id_prodi' => 20, 'jurusan_id' => 4, 'kode_prodi' => '4EC', 'nama_prodi' => 'D-4 Teknik Elektronika'],
        ];

        foreach ($prodiData as $data) {
            Prodi::create($data);
        }
    }
}

