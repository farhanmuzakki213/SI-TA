<?php

namespace App\Http\Controllers\Dosen\Penguji;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\PklMhs;
use App\Models\PklNilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PklNilaiController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $mahasiswa_ids = Booking::where('tipe', '1')->pluck('mahasiswa_id')->collect()->toArray();
        $data_pklmhs = PklMhs::with('r_usulan.r_mahasiswa')->whereNotNull('judul')->where('status_ver_pkl', '3')->where('penguji_id', $id_dosen)->get();
        $mahasiswaPklOptions = $data_pklmhs->filter(function ($p) use ($mahasiswa_ids) {
            return in_array($p->r_usulan->r_mahasiswa->id_mahasiswa, $mahasiswa_ids);
        })->map(function ($p) {
            return [
                'label' => $p->r_usulan->r_mahasiswa->nama_mahasiswa ?? 'Unknown',
                'value' => $p->id_pkl_mhs ?? null,
                'mahasiswa_id' => $p->r_usulan->r_mahasiswa->id_mahasiswa ?? null,
                'penguji_id' => $p->penguji_id,
            ];
        })->values();
        return Inertia::render('main/penguji/nilaipkl/nilai', [
            'data_nilaipkl' => PklNilai::where('dosen_id', $id_dosen)->with('r_pkl_mhs.r_usulan.r_mahasiswa')->get(),
            'mahasiswaPklOptions' => $mahasiswaPklOptions,
            'nextNumber' => CariNomor::getCariNomor(PklNilai::class, 'id_pkl_nilai'),
        ]);
    }

    public function store(Request $request)
    {
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

            return to_route('nilaipklpenguji')->with('success', 'Nilai Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('nilaipklpenguji')->with('error', 'Nilai Pkl created failed', $e->getMessage());
        }
    }
}
