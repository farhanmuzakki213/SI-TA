<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\PklMhs;
use App\Models\PklNilai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PklNilaiController extends Controller
{
    public function index(){
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $mahasiswa_ids = Booking::where('tipe', '1')->pluck('mahasiswa_id')->collect()->toArray();
        $data_pklmhs = PklMhs::with('r_usulan.r_mahasiswa')->whereNotNull('judul')->where('status_ver_pkl', '3')->where('pembimbing_id', $id_dosen)->get();
        $mahasiswaPklOptions = $data_pklmhs->filter(function ($p) use ($mahasiswa_ids) {
            return in_array($p->r_usulan->r_mahasiswa->id_mahasiswa, $mahasiswa_ids);
        })->map(function ($p) {
            return [
                'label' => $p->r_usulan->r_mahasiswa->nama_mahasiswa ?? 'Unknown',
                'value' => $p->r_usulan->r_mahasiswa->id_mahasiswa ?? null,
                'id_pkl_mhs' => $p->id_pkl_mhs,
                'pembimbing_id' => $p->pembimbing_id,
            ];
        })->values();
        return Inertia::render('main/pembimbing/nilaipkl/nilai', [
            'data_nilaipkl' => PklNilai::where('penguji_id', $id_dosen)->with('r_pkl_mhs.r_usulan.r_mahasiswa')->get(),
            'mahasiswaPklOptions' => $mahasiswaPklOptions,
            'nextNumber' => CariNomor::getCariNomor(PklNilai::class, 'id_pkl_nilai'),
        ]);
    }
}
