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
        DB::table('usulan_tempat_pkls')->insert([
            [
                'id_usulan' => 1,
                'role_tempat_pkl_id' => 301,
                'mahasiswa_id' => 1,
                'komentar' => 'ok',
                'status_usulan' => '2'
            ],
            [
                'id_usulan' => 2,
                'role_tempat_pkl_id' => 100,
                'mahasiswa_id' => 2,
                'komentar' => 'ok',
                'status_usulan' => '2'
            ],
            [
                'id_usulan' => 3,
                'role_tempat_pkl_id' => 100,
                'mahasiswa_id' => 3,
                'komentar' => 'Tidak sesuai dengan prodi',
                'status_usulan' => '0'
            ],
            [
                'id_usulan' => 4,
                'role_tempat_pkl_id' => 500,
                'mahasiswa_id' => 30,
                'komentar' => null,
                'status_usulan' => '1'
            ],
            [
                'id_usulan' => 5,
                'role_tempat_pkl_id' => 502,
                'mahasiswa_id' => 82,
                'komentar' => null,
                'status_usulan' => '1'
            ],
        ]);
    }
}
