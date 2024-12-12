<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleTempatPklSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['FrontEnd Developer', 'BackEnd Developer', 'FullStack Developer', 'Android Developer', 'iOS Developer', 'DevOps Engineer', 'Data Analyst', 'Data Scientist', 'IT Project Manager', 'UX Designer'];
        foreach ($roles as $index => $role) {
            DB::table('role_tempat_pkls')->insert([
                'id_role_tempat_pkl' => $index + 1,
                'nama_role' => $role,
            ]);
        }
    }
}
