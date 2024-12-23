<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsResource;
use App\Http\Resources\MhsSemproResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Mahasiswa;
use App\Models\SemproMhs;
use App\Models\TaBimbingan;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TAController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $mahasiswa = Mahasiswa::where('user_id', $id_user)->with('r_user', 'r_kelas.r_prodi.r_jurusan')->get();
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_ta = TaMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji_1',
                'r_penguji_2',
                'r_sekretaris',
                'r_ketua',
            )
            ->get();

        $id_ta_mhs = $data_ta->first()->id_ta_mhs;
        $data_sempro = SemproMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji',
            )
            ->where('status_sempro', '3')
            ->get();
        $data_bimbingan_1 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_1')->get();
        $data_bimbingan_2 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_2')->get();
        $data_bimbingan = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->get();
        // dd($data_ta, $data_sempro->toArray());
        return Inertia::render('main/mahasiswa/ta/index', [
            'data_mahasiswa' => MhsResource::collection($mahasiswa),
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_bimbingan' => MhsBimbinganTAResource::collection($data_bimbingan),
            'data_bimbingan_1' => MhsBimbinganTAResource::collection($data_bimbingan_1),
            'data_bimbingan_2' => MhsBimbinganTAResource::collection($data_bimbingan_2),
            'data_sempro' => MhsSemproResource::collection($data_sempro),
        ]);
    }
}
