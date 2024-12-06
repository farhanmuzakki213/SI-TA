<?php

namespace App\Http\Resources;

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
        $tanggalAwal = Carbon::parse($this->r_usulan->r_roleTempatPkls->tgl_awal_pkl)->format('M d, Y');
        $tanggalAkhir = Carbon::parse($this->r_usulan->r_roleTempatPkls->tgl_akhir_pkl)->format('M d, Y');
        $fotoProfile = $this->r_usulan->r_mahasiswa->r_user->images ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80";

        if ($this->r_usulan->r_roleTempatPkls->tgl_awal_pkl > Carbon::now()) {
            $status_pkl = 'Belum Magang';
        } elseif ($this->r_usulan->r_roleTempatPkls->tgl_awal_pkl <= Carbon::now() && $this->r_usulan->r_roleTempatPkls->tgl_akhir_pkl >= Carbon::now()) {
            $status_pkl = 'Sedang Magang';
        } else {
            $status_pkl = 'Selesai Magang';
        }
        return [
            'id_pkl_mhs' => $this->id_pkl_mhs,
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
            'dosen_pembimbing' => $this->r_pembimbing->nama_dosen,
            'dosen_penguji' => $this->r_penguji->nama_dosen,
            'pkl_pembimbing' => $this->pembimbing_pkl,
            'alamat_perusahaan' => $this->r_usulan->r_roleTempatPkls->r_tempatPkls->alamat_tempat_pkl,
        ];
    }
}
