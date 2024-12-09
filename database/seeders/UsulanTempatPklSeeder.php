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
        // DB::table('usulan_tempat_pkls')->insert([
        //     [
        //         'id_usulan' => 1,
        //         'role_tempat_pkl_id' => 301,
        //         'mahasiswa_id' => 1,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 2,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 2,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 3,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 3,
        //         'komentar' => 'Tidak sesuai dengan prodi',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 4,
        //         'role_tempat_pkl_id' => 500,
        //         'mahasiswa_id' => 30,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 5,
        //         'role_tempat_pkl_id' => 502,
        //         'mahasiswa_id' => 82,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 6,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 6,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 7,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 7,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 8,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 8,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 9,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 9,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 10,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 10,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 11,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 11,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 12,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 12,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 13,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 13,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 14,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 14,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 15,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 15,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 16,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 16,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 17,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 17,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 18,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 18,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 19,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 19,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 20,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 20,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 21,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 21,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 22,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 22,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 23,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 23,
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 24,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 24,
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 25,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => 25,
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 26,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 27,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 28,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 29,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 30,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 31,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 32,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        //     [
        //         'id_usulan' => 33,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'tidak sesuai',
        //         'status_usulan' => '1'
        //     ],
        //     [
        //         'id_usulan' => 34,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => null,
        //         'status_usulan' => '2'
        //     ],
        //     [
        //         'id_usulan' => 35,
        //         'role_tempat_pkl_id' => 100,
        //         'mahasiswa_id' => rand(26, 120),
        //         'komentar' => 'ok',
        //         'status_usulan' => '3'
        //     ],
        // ]);
    }
}
