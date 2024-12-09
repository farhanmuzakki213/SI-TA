<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use Barryvdh\DomPDF\Facade\Pdf;

class SuratTugasController extends Controller
{
    public function pkl($id)
    {
        $data_sidang_pkl = PklMhs::where('id_pkl_mhs', $id)->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls', 'r_pembimbing', 'r_penguji')->first();
        $jadwal_sidang = Booking::where('mahasiswa_id', $data_sidang_pkl->r_usulan->mahasiswa_id)
        ->where('status_booking', '1')
        ->where('tipe',  '1')
        ->with('r_sesi', 'r_ruangan', 'r_mahasiswa.r_kelas')->first();
        $Kaprodi = Pimpinan::where('jabatan_pimpinan_id', '3')->where('prodi_id', $jadwal_sidang->r_mahasiswa->r_kelas->prodi_id)->with('r_dosen')->first();
        // dd( $data_sidang_pkl->toArray(), $Kaprodi->toArray(), $jadwal_sidang->toArray());
        $data = [
            'data_sidang_pkl' => $data_sidang_pkl,
            'jadwal_sidang' => $jadwal_sidang,
            'Kaprodi' => $Kaprodi,
        ];
        $pdf = Pdf::loadView('file.surat_tugas_pkl', $data);
        return $pdf->stream('Surat Tugas PKL.pdf');
    }
}
