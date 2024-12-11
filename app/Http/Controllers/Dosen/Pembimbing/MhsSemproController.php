<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsSemproResource;
use App\Models\Dosen;
use App\Models\SemproMhs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhsSemproController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $data_sempro = SemproMhs::with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji'
        )
            ->where('pembimbing_1_id', $id_dosen)
            ->OrWhere('pembimbing_2_id', $id_dosen)
            ->get();
        return Inertia::render('main/pembimbing/mhssempro/index', [
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'dosen_id' => $id_dosen,
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $data_sempro = SemproMhs::with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji'
        )
            ->where('id_sempro_mhs', $id)
            ->get();
        return Inertia::render('main/pembimbing/mhssempro/detail', [
            'data_mhs' => MhsSemproResource::collection($data_sempro),
            'dosen_id' => $id_dosen,
        ]);
    }
}
