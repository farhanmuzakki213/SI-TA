<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_kelas = [
            [1, 42, 4, '4-TRPL-A', '4-Rekayasa Perangkat Lunak-A'],
            [2, 42, 4, '4-TRPL-B', '4-Rekayasa Perangkat Lunak-B'],
            [3, 42, 4, '3-TRPL-C', '3-Rekayasa Perangkat Lunak-C'],
            [4, 35, 4, '3-MI-A', '3-Manajemen Informatika-A'],
            [5, 35, 4, '3-TK-A', '3-Teknik Komputer-A'],
        ];

        foreach ($data_kelas as $data) {
            DB::table('kelas')->insert([
                'id_kelas' => $data[0],
                'prodi_id' => $data[1],
                'smt_thnakd_id' => $data[2],
                'kode_kelas' => $data[3],
                'nama_kelas' => $data[4],
            ]);
        }
    }
}
