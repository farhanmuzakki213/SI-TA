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
        return [
            'id_log_book_pkl' => $this->id_log_book_pkl,
            'tanggal' => Carbon::parse($this->tgl_awal_kegiatan)->format('M d, Y') . " - " . Carbon::parse($this->tgl_akhir_kegiatan)->format('M d, Y'),
            'tgl_awal_kegiatan' => $this->tgl_awal_kegiatan,
            'tgl_akhir_kegiatan' => $this->tgl_akhir_kegiatan,
            'kegiatan' => json_decode($this->kegiatan, true),
            'file' => $this->dokumen_laporan,
            'komentar' => $this->komentar,
            'status' => $this->status,
            'nilai' => json_decode($this->nilai, true)
        ];
    }
}
