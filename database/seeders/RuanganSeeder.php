<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_ruangan = [
            [1, 'E-301'],
            [2, 'E-302'],
            [3, 'E-310'],
            [4, 'E-311'],
        ];

        foreach ($data_ruangan as $data) {
            DB::table('ruangan')->insert([
                'id_ruangan' => $data[0],
                'kode_ruangan' => $data[1],
            ]);
        }
    }
}
