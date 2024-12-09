<?php

namespace App\Http\Resources;

use App\Models\Booking;
use App\Models\PklNilai;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsPklResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $jadwal_sidang = Booking::where('mahasiswa_id', $this->r_usulan->r_mahasiswa->id_mahasiswa)->where('tipe', '1')->where('status_booking', '1')->with('r_sesi', 'r_ruangan')->get();
        $tanggalAwal = Carbon::parse($this->r_usulan->r_roleTempatPkls->tgl_awal_pkl)->format('M d, Y');
        $tanggalAkhir = Carbon::parse($this->r_usulan->r_roleTempatPkls->tgl_akhir_pkl)->format('M d, Y');
        if (!empty($jadwal_sidang) && isset($jadwal_sidang[0]['tgl_booking'])) {
            $tanggalSidang = Carbon::parse($jadwal_sidang[0]['tgl_booking'])->format('M d, Y');
            $sesi = $jadwal_sidang[0]->r_sesi->periode_sesi;
            $ruangan = $jadwal_sidang[0]->r_ruangan->kode_ruangan;
        } else {
            $tanggalSidang = null;
            $sesi = null;
            $ruangan = null;
        }
        $fotoProfile = $this->r_usulan->r_mahasiswa->r_user->images ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80";

        if ($this->r_usulan->r_roleTempatPkls->tgl_awal_pkl > Carbon::now()) {
            $status_pkl = 'Belum Magang';
        } elseif ($this->r_usulan->r_roleTempatPkls->tgl_awal_pkl <= Carbon::now() && $this->r_usulan->r_roleTempatPkls->tgl_akhir_pkl >= Carbon::now()) {
            $status_pkl = 'Sedang Magang';
        } else {
            $status_pkl = 'Selesai Magang';
        }

        //Nilai
        $nilai_pembimbing = PklNilai::where('dosen_id', $this->r_pembimbing->id_dosen)->where('pkl_mhs_id', $this->id_pkl_mhs)->select('nilai')->first();
        $nilai_penguji = PklNilai::where('dosen_id', $this->r_penguji->id_dosen)->where('pkl_mhs_id', $this->id_pkl_mhs)->select('nilai')->first();
        return [
            'id_pkl_mhs' => $this->id_pkl_mhs,
            'id_mahasiswa' => $this->r_usulan->r_mahasiswa->id_mahasiswa,
            'nama_mahasiswa' => $this->r_usulan->r_mahasiswa->nama_mahasiswa,
            'nim_mahasiswa' => $this->r_usulan->r_mahasiswa->nim_mahasiswa,
            'prodi' => $this->r_usulan->r_mahasiswa->r_kelas->r_prodi->nama_prodi,
            'jurusan' => $this->r_usulan->r_mahasiswa->r_kelas->r_prodi->r_jurusan->nama_jurusan,
            'foto_mahasiswa' => $fotoProfile,
            'tempat_pkl' => $this->r_usulan->r_roleTempatPkls->r_tempatPkls->nama_tempat_pkl,
            'role_pkl' => $this->r_usulan->r_roleTempatPkls->nama_role,
            'tgl_awal_pkl' => $tanggalAwal,
            'tgl_akhir_pkl' => $tanggalAkhir,
            'status_usulan' => $this->r_usulan->status_usulan,
            'status_pkl' => $status_pkl,
            'status_ver_pkl' => $this->status_ver_pkl,
            'dosen_pembimbing' => $this->r_pembimbing->nama_dosen,
            'pembimbing_id' => $this->pembimbing_id,
            'dosen_penguji' => $this->r_penguji->nama_dosen,
            'penguji_id' => $this->penguji_id,
            'pkl_pembimbing' => $this->pembimbing_pkl,
            'alamat_perusahaan' => $this->r_usulan->r_roleTempatPkls->r_tempatPkls->alamat_tempat_pkl,
            'id_usulan' => $this->r_usulan->id_usulan,
            'judul' => $this->judul_laporan,
            'file_laporan' => $this->file_laporan,
            'file_nilai' => $this->file_nilai,
            'tgl_sidang' => $tanggalSidang ?? null,
            'sesi_sidang' => $sesi ?? null,
            'ruangan_sidang' => $ruangan ?? null,
            'nilai_industri' => $this->nilai_industri ?? null,
            'nilai_pembimbing' => $nilai_pembimbing,
            'nilai_penguji' => $nilai_penguji,

            'tgl_booking' => $jadwal_sidang[0]->tgl_booking ?? null,
            'sesi_id' => $jadwal_sidang[0]->sesi_id ?? null,
            'ruangan_id' => $jadwal_sidang[0]->ruangan_id ?? null,
            'status_booking' => $jadwal_sidang[0]->status_booking ?? null,
            'id_booking' => $jadwal_sidang[0]->id_booking ?? null
        ];
    }
}
