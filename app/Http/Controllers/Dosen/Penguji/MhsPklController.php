<?php

namespace App\Http\Controllers\Dosen\Penguji;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklLaporanResource;
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
        $pkl_mhs = PklMhs::where('penguji_id', $id_dosen)->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls')->get();
        // dd($pkl_mhs_id);
        return Inertia::render('main/penguji/mhspkl/index', [
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

        return Inertia::render('main/penguji/mhspkl/detail', [
            'data_mhs' => MhsPklResource::collection($data_mhs),
            'data_nilai' => MhsPklNilaiResource::collection($data_nilai),
            'data_laporan' => MhsPklLaporanResource::collection($data_laporan),
            'nextNumber_nilai' => CariNomor::getCariNomor(PklNilai::class, 'id_pkl_nilai'),
        ]);
    }

    public function storeNilai(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_pkl_nilai' => 'required',
            'pkl_mhs_id' => 'required',
            'bahasa' => 'required',
            'analisis' => 'required',
            'sikap' => 'required',
            'komunikasi' => 'required',
            'penyajian' => 'required',
            'penguasaan' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $total_nilai = ($request->bahasa * 0.15) + ($request->analisis * 0.15) + ($request->sikap * 0.15) + ($request->komunikasi * 0.15) + ($request->penyajian * 0.15) + ($request->penguasaan * 0.25);
        $nilai_data = [
            'bahasa' => $request->bahasa,
            'analisis' => $request->analisis,
            'sikap' => $request->sikap,
            'komunikasi' => $request->komunikasi,
            'penyajian' => $request->penyajian,
            'penguasaan' => $request->penguasaan,
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
                'sebagai' => 'penguji',
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
            'bahasa' => 'required',
            'analisis' => 'required',
            'sikap' => 'required',
            'komunikasi' => 'required',
            'penyajian' => 'required',
            'penguasaan' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error 123', $validator->errors()->first());
        }
        $total_nilai = ($request->bahasa * 0.15) + ($request->analisis * 0.15) + ($request->sikap * 0.15) + ($request->komunikasi * 0.15) + ($request->penyajian * 0.15) + ($request->penguasaan * 0.25);
        $nilai_data = [
            'bahasa' => $request->bahasa,
            'analisis' => $request->analisis,
            'sikap' => $request->sikap,
            'komunikasi' => $request->komunikasi,
            'penyajian' => $request->penyajian,
            'penguasaan' => $request->penguasaan,
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
