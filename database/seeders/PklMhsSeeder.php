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
            [1,  13,  14,  1  , "pembimbing1" , "test1.pdf", "judul1", "1"],
            [2,  40,  46,  2  , "pembimbing2" , "test2.pdf", "judul2", "1"],
            [3,  50,  52,  8  , "pembimbing3" , "test3.pdf", "judul3", "2"],
            [4,  66,  85,  11 , "pembimbing4" , "test4.pdf", "judul4", "1"],
            [5,  91,  103, 14 , "pembimbing5" , "test5.pdf", "judul5", "3"],
            [6,  109, 116, 17 , "pembimbing6" , "test6.pdf", "judul6", "1"],
            [7,  121, 122, 20 , "pembimbing7" , "test7.pdf", "judul7", "1"],
            [8,  127, 132, 23 , "pembimbing8" , "test8.pdf", "judul8", "2"],
            [9,  160, 198, 26 , "pembimbing9" , "test9.pdf", "judul9", "1"],
            [10, 206, 212, 29 , "pembimbing10", "test10.pdf", "judul10", "1"],
            [11, 220, 223, 32 , "pembimbing11", "test11.pdf", "judul11", "3"],
            [12, 258, 277, 35 , "pembimbing12", "test12.pdf", "judul12", "1"],
        ];
        foreach ($data_pkl_mhs as $data) {
            DB::table('pkl_mhs')->insert([
                'id_pkl_mhs' => $data[0],
                'pembimbing_id' => $data[1],
                'penguji_id' => $data[2],
                'usulan_tempat_pkl_id' => $data[3],
                'pembimbing_pkl' => $data[4],
                'dokumen_pendukung' => $data[5],
                'judul' => $data[6],
                'status_ver_pkl' => $data[7],
            ]);
        }
    }
}
