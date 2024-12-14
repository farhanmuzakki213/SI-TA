<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsulanTempatPklSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alamatTempatPkl = [
            1 => ['alamat' => 'Jl. Jend. Sudirman No. 8', 'kota' => 'Surabaya'],
            2 => ['alamat' => 'Jl. Kusuma Bangsa No. 15', 'kota' => 'Malang'],
            3 => ['alamat' => 'Jl. Raya Kepanjen No. 111', 'kota' => 'Malang'],
            4 => ['alamat' => 'Jl. Semarang No. 23', 'kota' => 'Surabaya'],
            5 => ['alamat' => 'Jl. Raya Waru No. 6', 'kota' => 'Sidoarjo'],
            6 => ['alamat' => 'Jl. Raya Krian No. 8', 'kota' => 'Sidoarjo'],
            7 => ['alamat' => 'Jl. Raya Taman No. 10', 'kota' => 'Surabaya'],
            8 => ['alamat' => 'Jl. Raya Dukuh Kupang No. 12', 'kota' => 'Surabaya'],
        ];
        DB::table('usulan_tempat_pkls')->insert([
            [
                'id_usulan' => 1,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 1,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 2,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 2,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 3,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 3,
                'komentar' => 'Tidak sesuai dengan prodi',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 4,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 30,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 5,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 82,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 6,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 6,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 7,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 7,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 8,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 8,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 9,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 9,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 10,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 10,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 11,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 11,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 12,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 12,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 13,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 13,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 14,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 14,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 15,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 15,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 16,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 16,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 17,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 17,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 18,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 18,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 19,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 19,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '1',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 20,
                'tempat_pkl_id' => rand(1, 8),
                'alamat_tempat_pkl' => 'jl. jend. sudirman no. 8',
                'kota_perusahaan' => 'bandung',
                'mahasiswa_id' => 20,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 21,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 21,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 22,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 22,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '1',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 23,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 23,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 24,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 24,
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '1',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 25,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 25,
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '1',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 26,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 27,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '1',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 28,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 29,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 30,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 31,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 32,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 33,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => 'tidak sesuai',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 34,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => rand(26, 120),
                'komentar' => null,
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '2',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
            [
                'id_usulan' => 35,
                'tempat_pkl_id' => rand(1, 8),
                'mahasiswa_id' => 78,
                'komentar' => 'ok',
                'role_tempat_pkl_id' => rand(1, 10),
                'alamat_tempat_pkl' => $alamatTempatPkl[rand(1, 8)]['alamat'],
                'kota_perusahaan' => $alamatTempatPkl[rand(1, 8)]['kota'],
                'status_usulan' => '3',
                'tgl_awal_pkl' => date('y-m-d', strtotime('2022-08-01')),
                'tgl_akhir_pkl' => date('y-m-d', strtotime('+' . rand(4, 6) . ' months', strtotime('2022-08-01'))),
            ],
        ]);
    }
}
