<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PklNilaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pkl_nilais')->insert([
            [
                'id_pkl_nilai' => 1,
                'pkl_mhs_id' => 1,
                'dosen_id' => 13,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 2,
                'pkl_mhs_id' => 1,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'penguji',
            ],
            [
                'id_pkl_nilai' => 3,
                'pkl_mhs_id' => 2,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 4,
                'pkl_mhs_id' => 2,
                'dosen_id' => 46,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'penguji',
            ],
            [
                'id_pkl_nilai' => 5,
                'pkl_mhs_id' => 3,
                'dosen_id' => 50,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 6,
                'pkl_mhs_id' => 3,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'penguji',
            ],
            [
                'id_pkl_nilai' => 7,
                'pkl_mhs_id' => 4,
                'dosen_id' => 66,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 8,
                'pkl_mhs_id' => 4,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    $ba = rand(75, 95),
                    $an = rand(75, 95),
                    $si = rand(75, 95),
                    $ko = rand(75, 95),
                    $py = rand(75, 95),
                    $pg = rand(75, 95),
                    (array_sum([
                        (int) (0.15 * $ba),
                        (int) (0.15 * $an),
                        (int) (0.15 * $si),
                        (int) (0.15 * $ko),
                        (int) (0.15 * $py),
                        (int) (0.25 * $pg),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'penguji',
            ],
        ]);
    }
}
