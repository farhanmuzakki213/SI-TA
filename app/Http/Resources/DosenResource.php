<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DosenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_dosen' => $this->id_dosen,
            'user_id' => $this->user_id,
            'prodi_id' => $this->prodi_id,
            'nama_dosen' => $this->nama_dosen,
            'nidn_dosen' => $this->nidn_dosen,
            'gender' => $this->gender,
            'status_dosen' => $this->status_dosen,
            'nama_prodi' => $this->r_prodi->nama_prodi ?? null,
        ];
    }
}
