<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JabatanPimpinanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $JPData = [
            [1, 'KAJUR', 'Ketua Jurusan'],
            [2, 'SEKJUR', 'Sekretaris Jurusan'],
            [3, 'KAPRODI', 'Koordinator Program']
        ];

        foreach ($JPData as $data) {
            DB::table('jabatan_pimpinans')->insert([
                'id_jabatan_pimpinan' => $data[0],
                'kode_jabatan_pimpinan' => $data[1],
                'nama_jabatan_pimpinan' => $data[2],
            ]);
        }
    }
}
