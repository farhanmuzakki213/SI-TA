<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsPklNilaiPembimbingResource extends JsonResource
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
            'komunikasi' => $nilai['komunikasi'] ?? null,
            'keaktifan' => $nilai['keaktifan'] ?? null,
            'problem_solving' => $nilai['problem_solving'] ?? null,
            'total_nilai' => $nilai['total_nilai'] ?? null,
        ];
    }
}
