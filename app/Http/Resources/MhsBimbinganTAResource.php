<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsBimbinganTAResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_bimbingan_mhs' => $this->id_bimbingan_mhs,
            'ta_mhs_id' => $this->ta_mhs_id,
            'dosen_id' => $this->dosen_id,
            'nama_dosen' => $this->r_dosen->nama_dosen,
            'pembahasan' => $this->pembahasan,
            'file_bimbingan' => $this->file_bimbingan,
            'komentar' => $this->komentar,
            'sebagai' => $this->sebagai,
            'status_bimbingan_ta' => $this->status_bimbingan_ta,
            'tanggal_bimbingan' => $this->updated_at->format('d M Y'),
        ];
    }
}
