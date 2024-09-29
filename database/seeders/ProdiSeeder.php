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
            ['id_prodi' => 1, 'jurusan_id' => 1, 'kode_prodi' => 'TI', 'nama_prodi' => 'Teknik Informatika'],
            ['id_prodi' => 2, 'jurusan_id' => 1, 'kode_prodi' => 'SI', 'nama_prodi' => 'Sistem Informasi'],
            ['id_prodi' => 3, 'jurusan_id' => 2, 'kode_prodi' => 'TK', 'nama_prodi' => 'Teknik Kimia'],
            ['id_prodi' => 4, 'jurusan_id' => 2, 'kode_prodi' => 'TP', 'nama_prodi' => 'Teknik Perminyakan'],
        ];

        foreach ($prodiData as $data) {
            Prodi::create($data);
        }
    }
}

