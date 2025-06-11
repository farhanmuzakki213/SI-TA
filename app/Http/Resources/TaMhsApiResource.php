<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaMhsApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_ta_mhs' => $this->id_ta_mhs,
            'judul' => $this->judul,
            'file_proposal' => $this->file_proposal,
            'file_ta' => $this->file_ta,
            'file_laporan' => $this->file_laporan,
            'file_revisi_sidang' => $this->file_revisi_sidang,
            'ipk' => $this->ipk,
            'komentar_ta' => $this->komentar_ta,
            'komentar_proposal' => $this->komentar_proposal,
            'komentar_judul' => $this->komentar_judul,
            'acc_pembimbing_satu' => $this->acc_pembimbing_satu,
            'acc_pembimbing_dua' => $this->acc_pembimbing_dua,
            'status_ver_ta' => $this->status_ver_ta,
            'status_ver_proposal' => $this->status_ver_proposal,
            'status_judul' => $this->status_judul,
            'status_sidang_ta' => $this->status_sidang_ta,
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
            'penguji_1' => [
                'id_dosen' => $this->r_penguji_1->id_dosen,
                'nama_penguji_1' => $this->r_penguji_1->nama_dosen,
            ],
            'penguji_2' => [
                'id_dosen' => $this->r_penguji_2->id_dosen,
                'nama_penguji_2' => $this->r_penguji_2->nama_dosen,
            ],
            'ketua' => [
                'id_dosen' => $this->r_ketua->id_dosen,
                'nama_ketua' => $this->r_ketua->nama_dosen,
            ],
            'sekretaris' => [
                'id_dosen' => $this->r_sekretaris->id_dosen,
                'nama_sekretaris' => $this->r_sekretaris->nama_dosen,
            ],
        ];
    }
}
