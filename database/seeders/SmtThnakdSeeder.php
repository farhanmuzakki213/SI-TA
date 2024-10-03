<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SmtThnakdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_smt_thnakd = [
            [1, '20222', '2022/2023-Genap' , '0'],
            [2, '20231', '2023/2024-Ganjil' , '0'],
            [3, '20232', '2023/2024-Genap' , '0'],
            [4, '20231', '2023/2024-Ganjil', '1'],
        ];

        foreach ($data_smt_thnakd as $data) {
            DB::table('smt_thnakds')->insert([
                'id_smt_thnakd' => $data[0],
                'kode_smt_thnakd' => $data[1],
                'nama_smt_thnakd' => $data[2],
                'status_smt_thnakd' => $data[3],
            ]);
        }
    }
}
