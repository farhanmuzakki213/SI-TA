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
    {//1 -10 role
        DB::table('tempat_pkls')->insert([
            [
                'id_tempat_pkl' => 1,
                'nama_tempat_pkl' => 'PT. XL Axiata Tbk',
            ],
            [
                'id_tempat_pkl' => 2,
                'nama_tempat_pkl' => 'PT. Telkom Indonesia',
            ],
            [
                'id_tempat_pkl' => 3,
                'nama_tempat_pkl' => 'PT. Indosat Ooredoo',
            ],
            [
                'id_tempat_pkl' => 4,
                'nama_tempat_pkl' => 'PT. Tri Indonesia',
            ],
            [
                'id_tempat_pkl' => 5,
                'nama_tempat_pkl' => 'PT. Smartfren Telekom',
            ],
            [
                'id_tempat_pkl' => 6,
                'nama_tempat_pkl' => 'PT. Hutchison 3 Indonesia',
            ],
            [
                'id_tempat_pkl' => 7,
                'nama_tempat_pkl' => 'PT. Axis Telekom Indonesia',
            ],
            [
                'id_tempat_pkl' => 8,
                'nama_tempat_pkl' => 'PT. Nokia Indonesia',
            ],
        ]);
    }
}
