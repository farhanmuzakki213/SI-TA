<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsSemproNilaiResource extends JsonResource
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
            'id_sempro_nilai' => $this->id_sempro_nilai,
            'sempro_mhs_id' => $this->sempro_mhs_id,
            'dosen_id' => $this->dosen_id,
            'sebagai' => $this->sebagai,
            'pendahuluan' => $nilai['pendahuluan'] ?? null,
            'tinjauan_pustaka' => $nilai['tinjauan_pustaka'] ?? null,
            'metodologi_penelitian' => $nilai['metodologi_penelitian'] ?? null,
            'bahasa_dan_tata_tulis' => $nilai['bahasa_dan_tata_tulis'] ?? null,
            'presentasi' => $nilai['presentasi'] ?? null,
            'total_nilai' => $nilai['total_nilai'] ?? null,
        ];
    }
}
