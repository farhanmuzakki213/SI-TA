<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TempatPklSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tempat_pkls')->insert([
            [
                'id_tempat_pkl' => 1,
                'nama_perusahaan' => 'PT. Maju Jaya',
                'alamat_perusahaan' => 'Jl. Merdeka No. 123, Jakarta',
                'nomor_telepon_perusahaan' => '021-12345678',
            ],
            [
                'id_tempat_pkl' => 2,
                'nama_perusahaan' => 'CV. Sukses Mandiri',
                'alamat_perusahaan' => 'Jl. Kebangsaan No. 45, Bandung',
                'nomor_telepon_perusahaan' => '022-98765432',
            ],
            [
                'id_tempat_pkl' => 3,
                'nama_perusahaan' => 'UD. Sejahtera',
                'alamat_perusahaan' => 'Jl. Pahlawan No. 67, Surabaya',
                'nomor_telepon_perusahaan' => '031-11223344',
            ],
        ]);

    }
}
