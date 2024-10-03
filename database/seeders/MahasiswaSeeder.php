<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_mahasiswa = [
            [1,  10, 1 ,'1701091031', 'Wara Ulan Saputri', 'perempuan', '1'],
            [2,  11, 1 ,'1701081035', 'Silvia Angraini', 'perempuan', '1'],
            [3,  12, 1 ,'1701091033', 'Dea Annona Prayetno Putri', 'perempuan', '1'],
            [4,  13, 1 ,'1701091018', 'Yulia Ramadhani', 'perempuan', '1'],
            [6,  14, 1 ,'1701081027', 'Syahrul Gusti Hafendi', 'laki-laki', '1'],
            [7,  15, 1 ,'1701082019', 'Rendhika Aditya', 'laki-laki', '1'],
        ];

        foreach ($data_mahasiswa as $data) {
            DB::table('mahasiswas')->insert([
                'id_mahasiswa' => $data[0],
                'user_id' => $data[1],
                'kelas_id' => $data[2],
                'nim_mahasiswa' => $data[3],
                'nama_mahasiswa' => $data[4],
                'gender' => $data[5],
                'status_mahasiswa' => $data[6]
            ]);
        }
    }
}
