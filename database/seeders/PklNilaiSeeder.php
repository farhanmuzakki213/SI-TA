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
                    'bahasa' => $ba = rand(75, 95),
                    'analisis' => $an = rand(75, 95),
                    'sikap' => $si = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'penyajian' => $py = rand(75, 95),
                    'penguasaan' => $pg = rand(75, 95),
                    'total_nilai' => (array_sum([
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
                'id_pkl_nilai' => 2,
                'pkl_mhs_id' => 1,
                'dosen_id' => 13,
                'nilai' => json_encode([
                    'keaktifan' => $ka = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'problem_solving' => $ps = rand(75, 95),
                    'total_nilai' => (array_sum([
                        (int) (0.30 * $ka),
                        (int) (0.30 * $ko),
                        (int) (0.40 * $ps),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 3,
                'pkl_mhs_id' => 1,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    'bahasa' => $ba = rand(75, 95),
                    'analisis' => $an = rand(75, 95),
                    'sikap' => $si = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'penyajian' => $py = rand(75, 95),
                    'penguasaan' => $pg = rand(75, 95),
                    'total_nilai' => (array_sum([
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
                'id_pkl_nilai' => 4,
                'pkl_mhs_id' => 2,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    'bahasa' => $ba = rand(75, 95),
                    'analisis' => $an = rand(75, 95),
                    'sikap' => $si = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'penyajian' => $py = rand(75, 95),
                    'penguasaan' => $pg = rand(75, 95),
                    'total_nilai' => (array_sum([
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
                'pkl_mhs_id' => 2,
                'dosen_id' => 14,
                'nilai' => json_encode([
                    'keaktifan' => $ka = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'problem_solving' => $ps = rand(75, 95),
                    'total_nilai' => (array_sum([
                        (int) (0.30 * $ka),
                        (int) (0.30 * $ko),
                        (int) (0.40 * $ps),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 6,
                'pkl_mhs_id' => 2,
                'dosen_id' => 46,
                'nilai' => json_encode([
                    'bahasa' => $ba = rand(75, 95),
                    'analisis' => $an = rand(75, 95),
                    'sikap' => $si = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'penyajian' => $py = rand(75, 95),
                    'penguasaan' => $pg = rand(75, 95),
                    'total_nilai' => (array_sum([
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
                'pkl_mhs_id' => 12,
                'dosen_id' => 258,
                'nilai' => json_encode([
                    'keaktifan' => $ka = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'problem_solving' => $ps = rand(75, 95),
                    'total_nilai' => (array_sum([
                        (int) (0.30 * $ka),
                        (int) (0.30 * $ko),
                        (int) (0.40 * $ps),
                    ]) / 100) * 100
                ]),
                'sebagai' => 'pembimbing',
            ],
            [
                'id_pkl_nilai' => 8,
                'pkl_mhs_id' => 12,
                'dosen_id' => 258,
                'nilai' => json_encode([
                    'bahasa' => $ba = rand(75, 95),
                    'analisis' => $an = rand(75, 95),
                    'sikap' => $si = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'penyajian' => $py = rand(75, 95),
                    'penguasaan' => $pg = rand(75, 95),
                    'total_nilai' => (array_sum([
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
                'id_pkl_nilai' => 9,
                'pkl_mhs_id' => 12,
                'dosen_id' => 277,
                'nilai' => json_encode([
                    'bahasa' => $ba = rand(75, 95),
                    'analisis' => $an = rand(75, 95),
                    'sikap' => $si = rand(75, 95),
                    'komunikasi' => $ko = rand(75, 95),
                    'penyajian' => $py = rand(75, 95),
                    'penguasaan' => $pg = rand(75, 95),
                    'total_nilai' => (array_sum([
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
