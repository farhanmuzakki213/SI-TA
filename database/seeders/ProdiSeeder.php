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
            ['id_prodi' => 1, 'jurusan_id' => 1, 'kode_prodi' => '4EC', 'nama_prodi' => 'D4 - Teknik Elektronika'],
            ['id_prodi' => 2, 'jurusan_id' => 1, 'kode_prodi' => '3MI', 'nama_prodi' => 'D3 - Manajemen Informatika'],
            ['id_prodi' => 3, 'jurusan_id' => 1, 'kode_prodi' => '3TK', 'nama_prodi' => 'D3 - Teknik Komputer'],
            ['id_prodi' => 4, 'jurusan_id' => 1, 'kode_prodi' => '4TRPL', 'nama_prodi' => 'D4 - Teknologi Rekayasa Perangkat Lunak'],
        ];

        foreach ($prodiData as $data) {
            Prodi::create($data);
        }
    }
}

