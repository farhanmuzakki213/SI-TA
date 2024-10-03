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
            [1, 2, 4, '4-MI-A', '4-Manajemen Informatika-A'],
            [2, 2, 4, '4-MI-B', '4-Manajemen Informatika-B'],
            [3, 3, 4, '4-TK-A', '4-Teknik Komputer-A'],
            [4, 3, 4, '4-TK-B', '4-Teknik Komputer-B'],
            [5, 4, 4, '4-TRPL-A', '4-Teknologi Rekayasa Perangkat Lunak-A'],
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
