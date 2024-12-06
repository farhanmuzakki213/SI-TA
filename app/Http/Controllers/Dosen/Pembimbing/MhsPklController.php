<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklResource;
use App\Models\Dosen;
use App\Models\log_book_pkl;
use App\Models\PklMhs;
use App\Models\PklNilai;
use Inertia\Inertia;

class MhsPklController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $pkl_mhs_id = PklMhs::where('pembimbing_id', $id_dosen)->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_roleTempatPkls.r_tempatPkls')->get()->toArray();
        // dd($pkl_mhs_id);
        return Inertia::render('main/pembimbing/mhspkl/index', [
            'data_mhspkl' => $pkl_mhs_id,
        ]);
    }

    public function detail($id)
    {
        if (!$id) {
            abort(404, 'ID is required');
        }

        $id_user = auth()->id();
        $id_dosen = Dosen::where('user_id', $id_user)->value('id_dosen');

        $data_mhs = PklMhs::where('id_pkl_mhs', $id)
            ->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls')
            ->get();
        if (!$data_mhs) {
            abort(404, 'Data not found');
        }

        $data_nilai = PklNilai::where('pkl_mhs_id', $id)
            ->where('dosen_id', $id_dosen)
            ->get();

        $data_laporan = log_book_pkl::where('pkl_mhs_id', $id)->get();

        return Inertia::render('main/pembimbing/mhspkl/detail', [
            'data_mhs' => MhsPklResource::collection($data_mhs),
            'data_nilai' => $data_nilai,
            'data_laporan' => $data_laporan,
        ]);
    }
}
