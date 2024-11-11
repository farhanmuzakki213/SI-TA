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
        $tempatPkl = \App\Models\TempatPkl::all();
        foreach ($tempatPkl as $tp) {
            shuffle($roles);
            foreach (array_slice($roles, 0, rand(3, 10)) as $role) {
                DB::table('role_tempat_pkls')->insert([
                    'id_role_tempat_pkl' => $tp->id_tempat_pkl * 100 + array_search($role, $roles),
                    'tempat_pkl_id' => $tp->id_tempat_pkl,
                    'role_tempat_pkl' => $role,
                    'kuota' => rand(1, 10),
                    'status_tempat_pkl' => '1',
                ]);
            }
        }
    }
}
