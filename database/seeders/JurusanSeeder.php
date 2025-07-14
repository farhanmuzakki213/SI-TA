<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Jurusan::truncate();

        // Siapkan data dalam bentuk array
        $data = [
            ['id_jurusan' => '1', 'kode_jurusan' => 'AN', 'nama_jurusan' => 'Administrasi Niaga'],
            ['id_jurusan' => '2', 'kode_jurusan' => 'AK', 'nama_jurusan' => 'Akuntansi'],
            ['id_jurusan' => '3', 'kode_jurusan' => 'BI', 'nama_jurusan' => 'Bahasa Inggris'],
            ['id_jurusan' => '4', 'kode_jurusan' => 'EE', 'nama_jurusan' => 'Teknik Elektro'],
            ['id_jurusan' => '5', 'kode_jurusan' => 'ME', 'nama_jurusan' => 'Teknik Mesin'],
            ['id_jurusan' => '6', 'kode_jurusan' => 'SP', 'nama_jurusan' => 'Teknik Sipil'],
            ['id_jurusan' => '7', 'kode_jurusan' => 'TI', 'nama_jurusan' => 'Teknologi Informasi'],
        ];
        Jurusan::insert($data);
    }
}
