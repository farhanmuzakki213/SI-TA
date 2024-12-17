<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsTAResource;
use App\Models\Dosen;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhsTAController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $dosen = Dosen::where('user_id', $id_user)->with('r_prodi')->first();
        $data_ta = TaMhs::with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji_1',
                'r_penguji_2',
                'r_sekretaris',
                'r_ketua',
            )
            ->where('pembimbing_1_id', $dosen->id_dosen)
            ->OrWhere('pembimbing_2_id', $dosen->id_dosen)
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        return Inertia::render('main/pembimbing/mhsta/index', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_dosen' => $dosen,
        ]);
    }
}
