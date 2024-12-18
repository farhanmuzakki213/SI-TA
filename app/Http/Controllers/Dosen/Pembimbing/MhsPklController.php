<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklNilaiPembimbingResource;
use App\Http\Resources\PMhsPklLaporanResource;
use App\Http\Resources\MhsPklNilaiResource;
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
        $pkl_mhs = PklMhs::where('pembimbing_id', $id_dosen)->with('r_usulan.r_mahasiswa.r_user',
        'r_usulan.r_mahasiswa.r_kelas.r_prodi',
        'r_usulan.r_role_tempat_pkl',
        'r_usulan.r_tempat_pkl',
        )->get();
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
            ->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi',
            'r_usulan.r_tempat_pkl',
            'r_usulan.r_role_tempat_pkl',
            'r_pembimbing', 'r_penguji')
            ->get();

        $data_nilai = PklNilai::where('pkl_mhs_id', $id)
            ->where('dosen_id', $id_dosen)
            ->where('sebagai', 'pembimbing')
            ->get();

        $data_laporan = log_book_pkl::where('pkl_mhs_id', $id)->get();

        return Inertia::render('main/pembimbing/mhspkl/detail', [
            'data_mhs' => MhsPklResource::collection($data_mhs),
            'data_nilai' => MhsPklNilaiPembimbingResource::collection($data_nilai),
            'data_laporan' => PMhsPklLaporanResource::collection($data_laporan),
            'nextNumber_nilai' => CariNomor::getCariNomor(PklNilai::class, 'id_pkl_nilai'),
        ]);
    }

    public function updateLaporan(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status' => '2',
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

    public function storeNilai(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_pkl_nilai' => 'required',
            'pkl_mhs_id' => 'required',
            'keaktifan' => 'required',
            'komunikasi' => 'required',
            'problem_solving' => 'required',
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
            $id_user = auth()->user()->id;
            $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
            PklNilai::create([
                'id_pkl_nilai' => $request->id_pkl_nilai,
                'pkl_mhs_id' => $request->pkl_mhs_id,
                'dosen_id' => $id_dosen,
                'nilai' => json_encode($nilai_data),
                'sebagai' => 'pembimbing',
            ]);
            DB::commit();

            return back()->with('success', 'Nilai Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Nilai Pkl created failed');
        }
    }

    public function updateNilai(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'keaktifan' => 'required',
            'komunikasi' => 'required',
            'problem_solving' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error 123', $validator->errors()->first());
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
                'nilai' => json_encode($nilai_data),
            ];

            $nilaipkl = PklNilai::findOrFail($id);
            $nilaipkl->update($data);
            DB::commit();
            return back()->with('success', 'Nilai Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Nilai Pkl updated failed');
        }
    }
}
