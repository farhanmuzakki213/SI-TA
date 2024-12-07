<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsPklNilaiResource extends JsonResource
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
            'bahasa' => $nilai['bahasa'] ?? null,
            'analisis' => $nilai['analisis'] ?? null,
            'sikap' => $nilai['sikap'] ?? null,
            'komunikasi' => $nilai['komunikasi'] ?? null,
            'penyajian' => $nilai['penyajian'] ?? null,
            'penguasaan' => $nilai['penguasaan'] ?? null,
            'total_nilai' => $nilai['total_nilai'] ?? null,
        ];
    }
}
