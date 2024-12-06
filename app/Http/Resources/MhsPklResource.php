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
        $tanggalAwal = $this->r_usulan->r_roleTempatPkls->tgl_awal_pkl;
        $tanggalAkhir = $this->r_usulan->r_roleTempatPkls->tgl_akhir_pkl;
        $status = "";
        if($tanggalAwal > Carbon::now()) {
            $status = "Belum Mulai Magang";
        }
        if ($tanggalAwal <= Carbon::now() && $tanggalAkhir >= Carbon::now()) {
            $status = "Magang";
        }
        if ($tanggalAkhir < Carbon::now()) {
            $status = "Selesai Magang";
        }

        $formatTanggal = Carbon::parse($tanggalAwal)->format('M d, Y');
        return [
            'id_mhs_pkl' => $this->id_pkl_mhs,
            'nama_mahasiswa' => $this->r_usulan->r_mahasiswa->nama_mahasiswa,
            'nim_mahasiswa' => $this->r_usulan->r_mahasiswa->nim_mahasiswa,
            'prodi' => $this->r_usulan->r_mahasiswa->r_kelas->r_prodi->nama_prodi,
            'foto_mahasiswa' => $this->r_usulan->r_mahasiswa->r_user->images,
            'tempat_pkl' => $this->r_usulan->r_roleTempatPkls->r_tempatPkls->nama_tempat_pkl,
            'role_pkl' => $this->r_usulan->r_roleTempatPkls->nama_role,
            'tgl_awal_pkl' => $formatTanggal,
            'status' => $status,
        ];
    }
}
