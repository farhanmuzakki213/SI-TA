<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PimpinanJurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $PJData = [
            [1, 1, 40, '2022-2026', '1'],
            [2, 2, 46, '2022-2026', '1']
        ];

        foreach ($PJData as $data) {
            DB::table('pimpinan_jurusans')->insert([
                'id_pimpinan_jurusan' => $data[0],
                'jabatan_pimpinan_id' => $data[1],
                'dosen_id' => $data[2],
                'periode' => $data[3],
                'status_pimpinan_jurusan' => $data[4]
            ]);
        }
    }
}
