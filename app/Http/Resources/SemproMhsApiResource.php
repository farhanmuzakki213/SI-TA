<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SemproMhsApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_sempro_mhs' => $this->id_sempro_mhs,
            'judul_sempro' => $this->judul_sempro,
            'file_sempro' => $this->file_sempro,
            'komentar' => $this->komentar,
            'status_ver_sempro' => $this->status_ver_sempro,
            'status_judul_sempro' => $this->status_judul_sempro,
            'status_sempro' => $this->status_sempro,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),

            // Relationships
            'mahasiswa' => [
                'id_mahasiswa' => $this->r_mahasiswa->id_mahasiswa,
                'nama_mahasiswa' => $this->r_mahasiswa->nama_mahasiswa,
            ],
            'pembimbing_1' => [
                'id_dosen' => $this->r_pembimbing_1->id_dosen,
                'nama_pembimbing_1' => $this->r_pembimbing_1->nama_dosen,
            ],
            'pembimbing_2' => [
                'id_dosen' => $this->r_pembimbing_2->id_dosen,
                'nama_pembimbing_2' => $this->r_pembimbing_2->nama_dosen,
            ],
            'penguji' => [
                'id_dosen' => $this->r_penguji->id_dosen,
                'nama_penguji' => $this->r_penguji->nama_dosen,
            ],
        ];
    }
}
