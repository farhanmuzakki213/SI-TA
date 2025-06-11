<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PklMhsApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_pkl_mhs' => $this->id_pkl_mhs,
            'judul_laporan' => $this->judul_laporan,
            'pembimbing_pkl' => $this->pembimbing_pkl,
            'nilai_industri' => $this->nilai_industri,
            'status_ver_pkl' => $this->status_ver_pkl,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),

            // Relationships
            'mahasiswa' => [
                'id_mahasiswa' => $this->r_usulan->r_mahasiswa->id_mahasiswa,
                'nama_mahasiswa' => $this->r_usulan->r_mahasiswa->nama_mahasiswa,
            ],
            'pembimbing' => [
                'id_dosen' => $this->r_pembimbing->id_dosen,
                'nama_pembimbing' => $this->r_pembimbing->nama_dosen,
            ],
            'penguji' => [
                'id_dosen' => $this->r_penguji->id_dosen,
                'nama_penguji' => $this->r_penguji->nama_dosen,
            ],
        ];
    }
}
