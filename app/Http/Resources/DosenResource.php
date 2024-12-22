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
        if($this->status_dosen == '1'){
            $status_dosen = 'Aktif';
        }else{
            $status_dosen = 'Tidak Aktif';
        }
        return [
            'id_dosen' => $this->id_dosen,
            'user_id' => $this->user_id,
            'nama_user' => $this->r_user->name ?? null,
            'email' => $this->r_user->email ?? null,
            'prodi_id' => $this->prodi_id,
            'golongan_id' => $this->golongan_id,
            'nama_dosen' => $this->nama_dosen,
            'nidn_dosen' => $this->nidn_dosen,
            'nip_dosen' => $this->nip_dosen,
            'gender' => $this->gender,
            'status_dosen' => $status_dosen,
            'nama_golongan' => $this->r_golongan->nama_golongan ?? null,
            'nama_prodi' => $this->r_prodi->nama_prodi ?? null,
        ];
    }
}
