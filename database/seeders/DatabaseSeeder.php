<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\PklMhs;
use App\Models\PklNilai;
use App\Models\SemproMhs;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([JabatanPimpinanSeeder::class,]);
        $this->call([JurusanSeeder::class,]);
        $this->call([prodiSeeder::class,]);
        $this->call([SmtThnakdSeeder::class,]);
        $this->call([KelasSeeder::class,]);
        $this->call([GolonganSeeder::class,]);
        $this->call([RolesAndUsersSeeder::class,]);
        $this->call([SesiSeeder::class,]);
        $this->call([RuanganSeeder::class,]);
        $this->call([RoleTempatPklSeeder::class,]);
        $this->call([TempatPklSeeder::class,]);
        $this->call([UsulanTempatPklSeeder::class,]);
        $this->call([PklMhsSeeder::class,]);
        $this->call([LogBookPklSeeder::class,]);
        $this->call([BookingSeeder::class,]);
        $this->call([PklNilaiSeeder::class,]);
        $this->call([SemproMhsSeeder::class,]);
    }
}
