<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GolonganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_golongan = [
            [1, 'Asissten Ahli'],
            [2, 'Lektor'],
            [3, 'Lektor Kepala'],
            [4, 'Guru Besar'],
        ];
        foreach ($data_golongan as $data) {
            DB::table('golongans')->insert([
                'id_golongan' => $data[0],
                'nama_golongan' => $data[1],
            ]);
        }
    }
}
