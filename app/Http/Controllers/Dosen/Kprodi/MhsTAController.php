<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\TaBimbingan;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhsTAController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->with('r_prodi')->first();
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
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi->prodi_id);
            })
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        return Inertia::render('main/kaprodi/mhsta/index', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_dosen' => $kaprodi,
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->with('r_prodi')->first();
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
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi->prodi_id);
            })
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        $id_ta_mhs = $data_ta->first()->id_ta_mhs;
        $data_bimbingan = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('dosen_id', $kaprodi->prodi_id)->get();
        return Inertia::render('main/kaprodi/mhsta/detail', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_dosen' => $kaprodi,
            'dosenPengujiOptions' => Dosen::all()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
            'dosenPembimbingOptions' => Dosen::where('prodi_id', $kaprodi)->get()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
        ]);
    }
}
