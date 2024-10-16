<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $this->call([RolesAndUsersSeeder::class,]);
        $this->call([SesiSeeder::class,]);
        $this->call([RuanganSeeder::class,]);
    }
}
