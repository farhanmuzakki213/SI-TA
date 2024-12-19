<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemproMhsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sempro_mhs')->insert([
            [
                'id_sempro_mhs' => 1,
                'mahasiswa_id' => 73,
                'pembimbing_1_id' => 13,
                'pembimbing_2_id' => 14,
                'penguji_id' => 312,
                'judul_sempro' => 'judul1',
                'file_sempro' => 'test1.pdf',
                'komentar' => 'ok',
                'status_sempro' => '3',
                'status_judul_sempro' => '3',
                'status_ver_sempro' => '3',
            ],
        ]);
    }
}
