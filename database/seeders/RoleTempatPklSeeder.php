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
        $descriptions = ['Responsible for developing user-facing applications.', 'Handles server-side logic and integration.', 'Works on both client and server sides.', 'Develops mobile applications for Android.', 'Develops mobile applications for iOS.', 'Ensures reliable system operations.', 'Analyzes data to support decision-making.', 'Extracts insights from data.', 'Manages IT projects effectively.', 'Designs user experiences.'];
        $tempatPkl = \App\Models\TempatPkl::all();
        foreach ($tempatPkl as $tp) {
            shuffle($roles);
            foreach (array_slice($roles, 0, rand(3, 10)) as $index => $role) {
                DB::table('role_tempat_pkls')->insert([
                    'id_role_tempat_pkl' => $tp->id_tempat_pkl * 100 + $index,
                    'tempat_pkl_id' => $tp->id_tempat_pkl,
                    'nama_role' => $role,
                    'kuota' => rand(1, 10),
                    'decription' => $descriptions[array_search($role, $roles)],
                    'tgl_awal_pkl' => now()->subDays(rand(0, 365))->toDateString(),
                    'tgl_akhir_pkl' => now()->addDays(rand(0, 365))->toDateString(),
                    'status_tempat_pkl' => '1',
                ]);
            }
        }
    }
}
