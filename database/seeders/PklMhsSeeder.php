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
        // $data_pkl_mhs = [
        //     [1,  13,  14,  1  , "pembimbing1" , "laporan1.pdf",  "nilai1.pdf", "judul1", "3", 90],
        //     [2,  14,  46,  2  , "pembimbing2" , "laporan2.pdf",  "nilai2.pdf", "judul2", "3", 80],
        //     [3,  50,  14,  8  , "pembimbing3" , "laporan3.pdf",  "nilai3.pdf", "judul3", "3", 90],
        //     [4,  66,  14,  11 , "pembimbing4" , "laporan4.pdf",  "nilai4.pdf", "judul4", "3", 70],
        //     [5,  14,  103, 14 , "pembimbing5" , "laporan5.pdf",  "nilai5.pdf", "judul5", "3", 90],
        //     [6,  14, 116, 17 , "pembimbing6" ,  "laporan6.pdf",  "nilai6.pdf", "judul6", "3", 90],
        //     [7,  121, 14, 20 , "pembimbing7" ,  "laporan7.pdf",  "nilai7.pdf", "judul7", "3", 90],
        //     [8,  127, 132, 23 , "pembimbing8" , "laporan8.pdf",  "nilai8.pdf", "judul8", "3", 90],
        //     [9,  160, 198, 26 , "pembimbing9" , "laporan9.pdf",  "nilai9.pdf", "judul9", "1", 90],
        //     [10, 206, 212, 29 , "pembimbing10", "laporan10.pdf", "nilai10.pdf","judul10", "1", 90],
        //     [11, 220, 223, 32 , "pembimbing11", "laporan11.pdf", "nilai11.pdf","judul11", "3", 90],
        //     [12, 258, 277, 35 , "pembimbing12", "laporan12.pdf", "nilai12.pdf","judul12", "1", 90],
        // ];
        // foreach ($data_pkl_mhs as $data) {
        //     DB::table('pkl_mhs')->insert([
        //         'id_pkl_mhs' => $data[0],
        //         'pembimbing_id' => $data[1],
        //         'penguji_id' => $data[2],
        //         'usulan_tempat_pkl_id' => $data[3],
        //         'pembimbing_pkl' => $data[4],
        //         'file_laporan' => $data[5],
        //         'file_nilai' => $data[6],
        //         'judul_laporan' => $data[7],
        //         'status_ver_pkl' => $data[8],
        //         'nilai_industri' => $data[9],
        //     ]);
        // }
    }
}
