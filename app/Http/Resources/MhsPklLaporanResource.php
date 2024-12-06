<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsPklLaporanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tanggal = Carbon::parse($this->tgl_awal_kegiatan)->format('M d, Y') . " - " . Carbon::parse($this->tgl_akhir_kegiatan)->format('M d, Y');
        return [
            "tanggal" => $tanggal,
            "kegiatan" => $this->kegiatan,
            "status" => $this->status,
            "file" => $this->dokumen_laporan,
            "nilai" => $this->nilai
        ];
    }
}
