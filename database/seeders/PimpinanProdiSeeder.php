<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PimpinanProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $PPData = [
            [1, 3, 50, '2022-2026', '1'],
            [2, 3, 52, '2022-2026', '1'],
            [3, 3, 66, '2022-2026', '1'],
        ];

        foreach ($PPData as $data) {
            DB::table('pimpinan_prodis')->insert([
                'id_pimpinan_prodi' => $data[0],
                'jabatan_pimpinan_id' => $data[1],
                'dosen_id' => $data[2],
                'periode' => $data[3],
                'status_pimpinan_prodi' => $data[4]
            ]);
        }
    }
}
