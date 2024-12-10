<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsPklNilaiPengujiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $nilai = json_decode($this->nilai, true);

        return [
            'id_pkl_nilai' => $this->id_pkl_nilai,
            'pkl_mhs_id' => $this->pkl_mhs_id,
            'dosen_id' => $this->dosen_id,
            'sebagai' => $this->sebagai,
            'bahasa' => $nilai['bahasa'] ?? null,
            'analisis' => $nilai['analisis'] ?? null,
            'sikap' => $nilai['sikap'] ?? null,
            'penyajian' => $nilai['penyajian'] ?? null,
            'penguasaan' => $nilai['penguasaan'] ?? null,
            'komunikasi' => $nilai['komunikasi'] ?? null,
            'total_nilai' => $nilai['total_nilai'] ?? null,
        ];
    }
}
