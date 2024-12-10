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
                'mahasiswa_id' => 78,
                'judul_sempro' => 'judul1',
                'file_sempro' => 'test1.pdf',
                'komentar' => null,
            ],
        ]);
    }
}
