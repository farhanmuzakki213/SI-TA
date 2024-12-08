<?php

namespace App\Http\Resources;

use App\Models\PklMhs;
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
            'role' => $this->r_roleTempatPkls->nama_role,
            'nama_perusahan' => $this->r_roleTempatPkls->r_tempatPkls->nama_tempat_pkl,
            'alamat_perusahaan' => $this->r_roleTempatPkls->r_tempatPkls->alamat_tempat_pkl,
            'kota_perusahaan' => $this->r_roleTempatPkls->r_tempatPkls->kota_tempat_pkl,
            'status_usulan' => $this->status_usulan,
            'komentar' => $this->komentar,
            'id_pkl_mhs' => $id_pkl_mhs,
        ];
    }
}
