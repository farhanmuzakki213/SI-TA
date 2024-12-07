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
        $nilai = json_decode($this->nilai, true);
        $ka = $nilai['keaktifan'] ?? null;
        $ko = $nilai['komunikasi'] ?? null;
        $ps = $nilai['problem_solving'] ?? null;
        return [
            "id_log_book_pkl" => $this->id_log_book_pkl,
            "tanggal" => $tanggal,
            "kegiatan" => json_decode($this->kegiatan, true),
            "status" => $this->status,
            "file" => $this->dokumen_laporan,
            "keaktifan" => $ka,
            "komunikasi" => $ko,
            "problem_solving" => $ps,
            "komentar" => $this->komentar
        ];
    }
}
