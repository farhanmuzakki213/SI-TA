<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $dataUser = [
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen1',
                'email' => 'dosen1@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen2',
                'email' => 'dosen2@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen3',
                'email' => 'dosen3@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen4',
                'email' => 'dosen4@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen5',
                'email' => 'dosen5@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen6',
                'email' => 'dosen6@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen7',
                'email' => 'dosen7@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Dosen8',
                'email' => 'dosen8@dosen.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Mahasiswa',
                'email' => 'mahasiswa@mahasiswa.com',
                'password' => bcrypt('password')
            ],
        ];

        foreach ($dataUser as $user) {
            User::create($user);
        }

    }
}

