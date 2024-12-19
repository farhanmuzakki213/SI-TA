<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaMhsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ta_mhs')->insert([
            [
                'id_ta_mhs' => 1,
                'mahasiswa_id' => 73,
                'pembimbing_1_id' => 13,
                'pembimbing_2_id' => 14,
                'ketua_id' => 13,
                'sekretaris_id' => 312,
                'judul' => 'judul1',
            ],
        ]);
    }
}
