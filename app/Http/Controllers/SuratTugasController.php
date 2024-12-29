<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use App\Models\SemproMhs;
use App\Models\TaMhs;
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
        return $pdf->stream('Surat Tugas Sidang PKL.pdf');
    }

    public function sempro($id)
    {
        $data_sidang_sempro = SemproMhs::where('id_sempro_mhs', $id)->with('r_mahasiswa.r_user', 'r_mahasiswa.r_kelas.r_prodi', 'r_pembimbing_1', 'r_pembimbing_2', 'r_penguji')->first();
        $jadwal_sidang = Booking::where('mahasiswa_id', $data_sidang_sempro->mahasiswa_id)
        ->where('status_booking', '1')
        ->where('tipe',  '2')
        ->with('r_sesi', 'r_ruangan', 'r_mahasiswa.r_kelas')->first();
        $kajur = Pimpinan::where('jabatan_pimpinan_id', '1')
        ->whereHas('r_prodi', function ($query) use ($jadwal_sidang) {
            $query->where('jurusan_id', $jadwal_sidang->r_mahasiswa->r_kelas->r_prodi->jurusan_id);
        })->with('r_dosen', 'r_prodi.r_jurusan')->first();
        // dd( $data_sidang_sempro->toArray(), $kajur->toArray(), $jadwal_sidang->toArray());
        $data = [
            'data_sidang_sempro' => $data_sidang_sempro,
            'jadwal_sidang' => $jadwal_sidang,
            'kajur' => $kajur,
        ];
        $pdf = Pdf::loadView('file.surat_tugas_sempro', $data);
        return $pdf->stream('Surat Tugas Sidang Seminar Proposal.pdf');
    }

    public function taPembimbing($id)
    {
        $data_sidang_ta = TaMhs::where('id_ta_mhs', $id)->with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji_1',
            'r_penguji_2',
            'r_sekretaris',
            'r_ketua',
        )->first();
        $jadwal_sidang = Booking::where('mahasiswa_id', $data_sidang_ta->mahasiswa_id)
        ->where('status_booking', '1')
        ->where('tipe',  '3')
        ->with('r_sesi', 'r_ruangan', 'r_mahasiswa.r_kelas')->first();
        $kajur = Pimpinan::where('jabatan_pimpinan_id', '1')
        ->whereHas('r_prodi', function ($query) use ($jadwal_sidang) {
            $query->where('jurusan_id', $jadwal_sidang->r_mahasiswa->r_kelas->r_prodi->jurusan_id);
        })->with('r_dosen', 'r_prodi.r_jurusan')->first();
        // dd( $data_sidang_ta->toArray(), $kajur->toArray(), $jadwal_sidang->toArray());
        $data = [
            'data_sidang_ta' => $data_sidang_ta,
            'jadwal_sidang' => $jadwal_sidang,
            'kajur' => $kajur,
        ];
        $pdf = Pdf::loadView('file.surat_tugas_ta_pembimbing', $data);
        return $pdf->stream('Surat Tugas Sidang Tugas Akhir.pdf');
    }

    public function taPenguji($id)
    {
        $data_sidang_ta = TaMhs::where('id_ta_mhs', $id)->with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji_1',
            'r_penguji_2',
            'r_sekretaris',
            'r_ketua',
        )->first();
        $jadwal_sidang = Booking::where('mahasiswa_id', $data_sidang_ta->mahasiswa_id)
        ->where('status_booking', '1')
        ->where('tipe',  '3')
        ->with('r_sesi', 'r_ruangan', 'r_mahasiswa.r_kelas')->first();
        $kajur = Pimpinan::where('jabatan_pimpinan_id', '1')
        ->whereHas('r_prodi', function ($query) use ($jadwal_sidang) {
            $query->where('jurusan_id', $jadwal_sidang->r_mahasiswa->r_kelas->r_prodi->jurusan_id);
        })->with('r_dosen', 'r_prodi.r_jurusan')->first();
        // dd( $data_sidang_ta->toArray(), $kajur->toArray(), $jadwal_sidang->toArray());
        $data = [
            'data_sidang_ta' => $data_sidang_ta,
            'jadwal_sidang' => $jadwal_sidang,
            'kajur' => $kajur,
        ];
        $pdf = Pdf::loadView('file.surat_tugas_ta_penguji', $data);
        return $pdf->stream('Surat Tugas Sidang Tugas Akhir.pdf');
    }

    public function revisiTA($id)
    {
        $data_sidang_ta = TaMhs::where('id_ta_mhs', $id)->with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji_1',
            'r_penguji_2',
            'r_sekretaris',
            'r_ketua',
        )->first();
        $jadwal_sidang = Booking::where('mahasiswa_id', $data_sidang_ta->mahasiswa_id)
        ->where('status_booking', '1')
        ->where('tipe',  '3')
        ->with('r_sesi', 'r_ruangan', 'r_mahasiswa.r_kelas')->first();
        $kajur = Pimpinan::where('jabatan_pimpinan_id', '1')
        ->whereHas('r_prodi', function ($query) use ($jadwal_sidang) {
            $query->where('jurusan_id', $jadwal_sidang->r_mahasiswa->r_kelas->r_prodi->jurusan_id);
        })->with('r_dosen', 'r_prodi.r_jurusan')->first();
        // dd( $data_sidang_ta->toArray(), $kajur->toArray(), $jadwal_sidang->toArray());
        $data = [
            'data_sidang_ta' => $data_sidang_ta,
            'jadwal_sidang' => $jadwal_sidang,
            'kajur' => $kajur,
        ];
        $pdf = Pdf::loadView('file.revisi_ta_template', $data);
        return $pdf->stream('Template Revisi Tugas Akhir.pdf');
    }

    public function beritaAcaraTA($id)
    {
        $data_sidang_ta = TaMhs::where('id_ta_mhs', $id)->with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji_1',
            'r_penguji_2',
            'r_sekretaris',
            'r_ketua',
        )->first();
        $kajur = Pimpinan::where('jabatan_pimpinan_id', '1')
        ->whereHas('r_prodi', function ($query) use ($data_sidang_ta) {
            $query->where('jurusan_id', $data_sidang_ta->r_mahasiswa->r_kelas->r_prodi->jurusan_id);
        })->with('r_dosen', 'r_prodi.r_jurusan')->first();
        // dd( $data_sidang_ta->toArray(), $kajur->toArray());
        $data = [
            'data_sidang_ta' => $data_sidang_ta,
            'kajur' => $kajur,
        ];
        $pdf = Pdf::loadView('file.berita_acara_ta', $data);
        return $pdf->stream('Template Berita Acara.pdf');
    }
}
