<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PimpinanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
