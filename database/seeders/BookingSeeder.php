<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {//17, 20, 23, 8  tanggal 2024-11-27
        $data_golongan = [
            [1, 1, 1, 1,  "1", "2024-12-8", "1"],
            [2, 1, 2, 2,  "1", "2024-12-8", "1"],
            [3, 1, 3, 8,  "1", "2024-12-8", "0"],
            [4, 1, 4, 11, "1", "2024-12-8", "1"],
            [5, 1, 1, 14, "1", "2024-12-9", "1"],
        ];
        foreach ($data_golongan as $data) {
            DB::table('booking')->insert([
                'id_booking' => $data[0],
                'ruangan_id' => $data[1],
                'sesi_id' => $data[2],
                'mahasiswa_id' => $data[3],
                'tipe' => $data[4],
                'tgl_booking' => $data[5],
                'status_booking' => $data[6],
            ]);
        }
    }
}
