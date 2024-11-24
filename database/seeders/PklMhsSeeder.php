<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PklMhsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_pkl_mhs = [
            [1, 13, 14, 1],
            [2, 14, 40, 2],
        ];
        foreach ($data_pkl_mhs as $data) {
            DB::table('pkl_mhs')->insert([
                'id_pkl_mhs' => $data[0],
                'pembimbing_id' => $data[1],
                'penguji_id' => $data[2],
                'usulan_tempat_pkl_id' => $data[3],
            ]);
        }
    }
}
