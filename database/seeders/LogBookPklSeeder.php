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
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 2,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test2.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 3,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test3.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 4,
                'pkl_mhs_id' => 1,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test4.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 5,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test5.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 6,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test1.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 7,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test2.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 8,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test3.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 9,
                'pkl_mhs_id' => 2,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test4.pdf',
                'status' => '1',
                'komentar' => 'format salah',
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 10,
                'pkl_mhs_id' => 3,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test5.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 11,
                'pkl_mhs_id' => 3,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test6.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 12,
                'pkl_mhs_id' => 3,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test7.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 13,
                'pkl_mhs_id' => 3,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test8.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 14,
                'pkl_mhs_id' => 4,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test9.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 15,
                'pkl_mhs_id' => 4,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test10.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 16,
                'pkl_mhs_id' => 4,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test11.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 17,
                'pkl_mhs_id' => 4,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test12.pdf',
                'status' => '1',
                'komentar' => 'format salah',
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 18,
                'pkl_mhs_id' => 5,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test13.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 19,
                'pkl_mhs_id' => 5,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test14.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 20,
                'pkl_mhs_id' => 5,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test15.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 21,
                'pkl_mhs_id' => 5,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test16.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 22,
                'pkl_mhs_id' => 6,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test17.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 23,
                'pkl_mhs_id' => 6,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test18.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 24,
                'pkl_mhs_id' => 6,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test19.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 25,
                'pkl_mhs_id' => 6,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test20.pdf',
                'status' => '1',
                'komentar' => 'format salah',
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 26,
                'pkl_mhs_id' => 7,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test21.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 27,
                'pkl_mhs_id' => 7,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test22.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 28,
                'pkl_mhs_id' => 7,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test23.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 29,
                'pkl_mhs_id' => 7,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test24.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 30,
                'pkl_mhs_id' => 8,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test25.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 31,
                'pkl_mhs_id' => 8,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test26.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 32,
                'pkl_mhs_id' => 8,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test27.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 33,
                'pkl_mhs_id' => 8,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test28.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 34,
                'pkl_mhs_id' => 9,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test29.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 35,
                'pkl_mhs_id' => 9,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test30.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 36,
                'pkl_mhs_id' => 9,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test31.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 37,
                'pkl_mhs_id' => 9,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test32.pdf',
                'status' => '1',
                'komentar' => 'format salah',
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 38,
                'pkl_mhs_id' => 10,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test33.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 39,
                'pkl_mhs_id' => 10,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test34.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 40,
                'pkl_mhs_id' => 10,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test35.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 41,
                'pkl_mhs_id' => 10,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test36.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 42,
                'pkl_mhs_id' => 11,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test37.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 43,
                'pkl_mhs_id' => 11,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test38.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 44,
                'pkl_mhs_id' => 11,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test39.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 45,
                'pkl_mhs_id' => 11,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test40.pdf',
                'status' => '1',
                'komentar' => 'format salah',
                'nilai' => null,
            ],
            [
                'id_log_book_pkl' => 46,
                'pkl_mhs_id' => 12,
                'tgl_awal_kegiatan' => '2024-10-01',
                'tgl_akhir_kegiatan' => '2024-10-07',
                'dokumen_laporan' => 'test41.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 47,
                'pkl_mhs_id' => 12,
                'tgl_awal_kegiatan' => '2024-10-08',
                'tgl_akhir_kegiatan' => '2024-10-14',
                'dokumen_laporan' => 'test42.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 48,
                'pkl_mhs_id' => 12,
                'tgl_awal_kegiatan' => '2024-10-15',
                'tgl_akhir_kegiatan' => '2024-10-21',
                'dokumen_laporan' => 'test43.pdf',
                'status' => '3',
                'komentar' => 'ok',
                'nilai' => json_encode([
                    $ka = rand(75, 95),
                    $k = rand(75, 95),
                    $ps = rand(75, 95),
                    (array_sum([
                        (int) (0.3 * $ka),
                        (int) (0.3 * $k),
                        (int) (0.4 * $ps),
                    ]) / 100) * 100
                ])
            ],
            [
                'id_log_book_pkl' => 49,
                'pkl_mhs_id' => 12,
                'tgl_awal_kegiatan' => '2024-10-22',
                'tgl_akhir_kegiatan' => '2024-10-28',
                'dokumen_laporan' => 'test44.pdf',
                'status' => '2',
                'komentar' => null,
                'nilai' => null,
            ],
        ]);
    }
}
