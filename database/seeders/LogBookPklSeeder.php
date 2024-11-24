<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LogBookPklSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('log_book_pkls')->insert([
            [
                'id_log_book_pkl' => 1,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test1.pdf',
                'status' => '2',
                'komentar' => 'ok'
            ],
            [
                'id_log_book_pkl' => 2,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test2.pdf',
                'status' => '2',
                'komentar' => 'ok'
            ],
            [
                'id_log_book_pkl' => 3,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test3.pdf',
                'status' => '2',
                'komentar' => 'ok'
            ],
            [
                'id_log_book_pkl' => 4,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test4.pdf',
                'status' => '1',
                'komentar' => null
            ],
            [
                'id_log_book_pkl' => 5,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test5.pdf',
                'status' => '2',
                'komentar' => 'ok'
            ],
            [
                'id_log_book_pkl' => 6,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test6.pdf',
                'status' => '0',
                'komentar' => 'format salah'
            ],
        ]);
    }
}
