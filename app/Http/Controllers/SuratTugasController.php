<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use App\Models\SemproMhs;
use Barryvdh\DomPDF\Facade\Pdf;

class SuratTugasController extends Controller
{
    public function pkl($id)
    {
        $data_sidang_pkl = PklMhs::where('id_pkl_mhs', $id)->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_tempat_pkl', 'r_usulan.r_role_tempat_pkl', 'r_pembimbing', 'r_penguji')->first();
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

    public function sempro($id)
    {
        $data_sidang_sempro = SemproMhs::where('id_sempro_mhs', $id)->with('r_mahasiswa.r_user', 'r_mahasiswa.r_kelas.r_prodi', 'r_pembimbing_1', 'r_pembimbing_2', 'r_penguji')->first();
        $jadwal_sidang = Booking::where('mahasiswa_id', $data_sidang_sempro->mahasiswa_id)
        ->where('status_booking', '1')
        ->where('tipe',  '2')
        ->with('r_sesi', 'r_ruangan', 'r_mahasiswa.r_kelas')->first();
        $Kaprodi = Pimpinan::where('jabatan_pimpinan_id', '3')->where('prodi_id', $jadwal_sidang->r_mahasiswa->r_kelas->prodi_id)->with('r_dosen')->first();
        // dd( $data_sidang_sempro->toArray(), $Kaprodi->toArray(), $jadwal_sidang->toArray());
        $data = [
            'data_sidang_sempro' => $data_sidang_sempro,
            'jadwal_sidang' => $jadwal_sidang,
            'Kaprodi' => $Kaprodi,
        ];
        $pdf = Pdf::loadView('file.surat_tugas_sempro', $data);
        return $pdf->stream('Surat Tugas Sempro.pdf');
    }
}
