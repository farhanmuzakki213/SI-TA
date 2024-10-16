<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SesiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_sesi = [
            [1, '08:00 - 10:00'],
            [2, '10:00 - 12:00'],
            [3, '13:00 - 15:00'],
            [4, '15:00 - 17:00'],
        ];

        foreach ($data_sesi as $data) {
            DB::table('sesi')->insert([
                'id_sesi' => $data[0],
                'periode_sesi' => $data[1],
            ]);
        }
    }
}
