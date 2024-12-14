<?php

namespace App\Http\Resources;

use App\Models\PklMhs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsPklUsulanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($this->status_usulan == '3') {
            $id_pkl_mhs = PklMhs::where('usulan_tempat_pkl_id', $this->id_usulan)->first()->id_pkl_mhs;
        } else {
            $id_pkl_mhs = null;
        }

        return [
            'id_usulan' => $this->id_usulan,
            'nama_mahasiswa' => $this->r_mahasiswa->nama_mahasiswa,
            'nim_mahasiswa' => $this->r_mahasiswa->nim_mahasiswa,
            'prodi' => $this->r_mahasiswa->r_kelas->r_prodi->kode_prodi,
            'nama_role' => $this->r_role_tempat_pkl->nama_role,
            'role_tempat_pkl_id' => $this->r_role_tempat_pkl->id_role_tempat_pkl,
            'tempat_pkl_id' => $this->r_tempat_pkl->id_tempat_pkl,
            'alamat_perusahaan' => $this->alamat_tempat_pkl,
            'nama_tempat_pkl' => $this->r_tempat_pkl->nama_tempat_pkl,
            'alamat_tempat_pkl' => $this->alamat_tempat_pkl,
            'kota_perusahaan' => $this->kota_perusahaan,
            'tglAwal' => Carbon::parse($this->tgl_awal_pkl)->format('M d, Y'),
            'tgl_awal_pkl' => $this->tgl_awal_pkl,
            'tgl_akhir_pkl' => $this->tgl_akhir_pkl,
            'tglAkhir' => Carbon::parse($this->tgl_akhir_pkl)->format('M d, Y'),
            'status_usulan' => $this->status_usulan,
            'komentar' => $this->komentar,
            'id_pkl_mhs' => $id_pkl_mhs,
        ];
    }
}
