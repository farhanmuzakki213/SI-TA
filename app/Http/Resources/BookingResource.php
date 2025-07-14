<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_booking' => $this->id_booking,
            'ruangan' => [
                'id' => $this->r_ruangan->id_ruangan,
                'nama' => $this->r_ruangan->kode_ruangan,
            ],
            'sesi' => [
                'id' => $this->r_sesi->id_sesi,
                'nama' => $this->r_sesi->periode_sesi,
                // Add other session fields as needed
            ],
            'mahasiswa' => [
                'id' => $this->r_mahasiswa->id_mahasiswa,
                'nama' => $this->r_mahasiswa->nama_mahasiswa,
                'nim' => $this->r_mahasiswa->nim_mahasiswa,
                // Add other student fields as needed
            ],
            'tipe' => $this->tipe,
            'tgl_booking' => $this->tgl_booking,
            'status_booking' => $this->status_booking,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
