<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklLaporanResource;
use App\Http\Resources\MhsPklResource;
use Illuminate\Http\Request;
use App\Models\Dosen;
use App\Models\log_book_pkl;
use App\Models\PklMhs;
use App\Models\PklNilai;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MhsPklController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $pkl_mhs = PklMhs::where('pembimbing_id', $id_dosen)->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls')->get();
        // dd($pkl_mhs_id);
        return Inertia::render('main/pembimbing/mhspkl/index', [
            'data_mhspkl' => MhsPklResource::collection($pkl_mhs),
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->id();
        $id_dosen = Dosen::where('user_id', $id_user)->value('id_dosen');

        $data_mhs = PklMhs::where('id_pkl_mhs', $id)
            ->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls', 'r_pembimbing', 'r_penguji')
            ->get();

        $data_nilai = PklNilai::where('pkl_mhs_id', $id)
            ->where('dosen_id', $id_dosen)
            ->get();

        $data_laporan = log_book_pkl::where('pkl_mhs_id', $id)->get();

        return Inertia::render('main/pembimbing/mhspkl/detail', [
            'data_mhs' => MhsPklResource::collection($data_mhs),
            'data_nilai' => $data_nilai,
            'data_laporan' => MhsPklLaporanResource::collection($data_laporan),
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'keaktifan' => 'required',
            'komunikasi' => 'required',
            'problem_solving' => 'required',
            'status' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $total_nilai = ($request->keaktifan * 0.30) + ($request->komunikasi * 0.30) + ($request->problem_solving * 0.40);
        $nilai_data = [
            'keaktifan' => $request->keaktifan,
            'komunikasi' => $request->komunikasi,
            'problem_solving' => $request->problem_solving,
            'total_nilai' => round($total_nilai, 2),
        ];
        DB::beginTransaction();
        try {
            $data = [
                'status' => $request->status,
                'nilai' => json_encode($nilai_data),
                'komentar' => $request->komentar,
            ];

            $laporanpkl = log_book_pkl::findOrFail($id);
            $laporanpkl->update($data);
            DB::commit();
            return back()->with('success', 'Laporan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Laporan Pkl updated failed');
        }
    }
}
