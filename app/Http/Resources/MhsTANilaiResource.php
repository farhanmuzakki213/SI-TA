<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsTANilaiResource extends JsonResource
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
            'id_ta_nilai' => $this->id_ta_nilai,
            'ta_mhs_id' => $this->ta_mhs_id,
            'dosen_id' => $this->dosen_id,
            'sebagai' => $this->sebagai,
            'komentar' => $this->komentar,
            'etika_dan_penampilan' => $nilai['etika_dan_penampilan'] ?? null,
            'komunikasi_dan_sistematika' => $nilai['komunikasi_dan_sistematika'] ?? null,
            'penguasaan_materi_pengetahuan_dasar' => $nilai['penguasaan_materi_pengetahuan_dasar'] ?? null,
            'penguasaan_materi_pemahaman' => $nilai['penguasaan_materi_pemahaman'] ?? null,
            'penguasaan_materi_kemampuan_terapan' => $nilai['penguasaan_materi_kemampuan_terapan'] ?? null,
            'bahasa_dan_tata_tulis' => $nilai['bahasa_dan_tata_tulis'] ?? null,
            'penerapan_siklus_pengembangan_sistem' => $nilai['penerapan_siklus_pengembangan_sistem'] ?? null,
            'kesesuian_hasil_dengan_kebutuhan_sistem' => $nilai['kesesuian_hasil_dengan_kebutuhan_sistem'] ?? null,
            'program_sistem' => $nilai['program_sistem'] ?? null,
            'total_nilai' => $nilai['total_nilai'] ?? null,
        ];
    }
}
