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
                'nama_tempat_pkl' => 'PT. XL Axiata Tbk',
                'kode_tempat_pkl' => 'XL',
                'alamat_tempat_pkl' => 'Gedung XL, Jl. H.R. Rasuna Said, Jakarta Selatan',
                'tipe_tempat_pkl' => 'Perusahaan Telekomunikasi',
                'logo_tempat_pkl' => 'https://placehold.co/50x50?text=Logo+1',
                'detail_info_tempat_pkl' => 'https://www.xl.co.id/',
            ],
            [
                'id_tempat_pkl' => 2,
                'nama_tempat_pkl' => 'PT. Astra Honda Motor',
                'kode_tempat_pkl' => 'AHM',
                'alamat_tempat_pkl' => 'Jl. Gaya Motor Raya No. 8, Sunter II, Tanjung Priok, Jakarta Utara',
                'tipe_tempat_pkl' => 'Industri',
                'logo_tempat_pkl' => 'https://placehold.co/50x50?text=Logo+2',
                'detail_info_tempat_pkl' => 'https://www.astra-honda.com/',
            ],
            [
                'id_tempat_pkl' => 3,
                'nama_tempat_pkl' => 'PT. Bank Rakyat Indonesia (Persero) Tbk',
                'kode_tempat_pkl' => 'BRI',
                'alamat_tempat_pkl' => 'Jl. Jend. Sudirman Kav. 44-46, Jakarta Pusat',
                'tipe_tempat_pkl' => 'Keuangan',
                'logo_tempat_pkl' => 'https://placehold.co/50x50?text=Logo+3',
                'detail_info_tempat_pkl' => 'https://www.bri.co.id/',
            ],
            [
                'id_tempat_pkl' => 4,
                'nama_tempat_pkl' => 'PT. Bank Mandiri (Persero) Tbk',
                'kode_tempat_pkl' => 'BMRI',
                'alamat_tempat_pkl' => 'Jl. Jend. Sudirman No. 54-55, Jakarta Pusat',
                'tipe_tempat_pkl' => 'Perbankan',
                'logo_tempat_pkl' => 'https://placehold.co/50x50?text=Logo+4',
                'detail_info_tempat_pkl' => 'https://www.bankmandiri.co.id/',
            ],
            [
                'id_tempat_pkl' => 5,
                'nama_tempat_pkl' => 'PT. Telekomunikasi Indonesia (Persero) Tbk',
                'kode_tempat_pkl' => 'TLKM',
                'alamat_tempat_pkl' => 'Graha Merdeka, Jl. Asia Afrika No. 1, Bandung',
                'tipe_tempat_pkl' => 'Perusahaan Telekomunikasi',
                'logo_tempat_pkl' => 'https://placehold.co/50x50?text=Logo+5',
                'detail_info_tempat_pkl' => 'https://www.telkom.co.id/',
            ],
        ]);
    }
}
