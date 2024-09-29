<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Dosen;
use App\Models\JabatanPimpinan;
use App\Models\Mahasiswa;
use App\Models\Smt_thnakd;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([UserSeeder::class,]);
        $this->call([JabatanPimpinanSeeder::class,]);
        $this->call([JurusanSeeder::class,]);
        $this->call([KelasSeeder::class,]);
        $this->call([MahasiswaSeeder::class,]);
        $this->call([PimpinanProdiSeeder::class,]);
        $this->call([PimpinanJurusanSeeder::class,]);
        $this->call([prodiSeeder::class,]);
        $this->call([DosenSeeder::class,]);
        $this->call([SmtThnakdSeeder::class,]);
    }
}
