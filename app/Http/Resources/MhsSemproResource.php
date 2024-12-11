<?php

namespace App\Http\Resources;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsSemproResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $jadwal_sidang = Booking::where('mahasiswa_id', $this->mahasiswa_id)->where('tipe', '2')->where('status_booking', '1')->with('r_sesi', 'r_ruangan')->get();
        if (!empty($jadwal_sidang) && isset($jadwal_sidang[0]['tgl_booking'])) {
            $tanggalSidang = Carbon::parse($jadwal_sidang[0]['tgl_booking'])->format('M d, Y');
            $sesi = $jadwal_sidang[0]->r_sesi->periode_sesi;
            $ruangan = $jadwal_sidang[0]->r_ruangan->kode_ruangan;
        } else {
            $tanggalSidang = null;
            $sesi = null;
            $ruangan = null;
        }
        $fotoProfile = $this->r_mahasiswa->r_user->images ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80";
        return [
            'id_sempro_mhs' => $this->id_sempro_mhs,
            'judul_sempro' => $this->judul_sempro,
            'file_sempro' => $this->file_sempro,
            'komentar' => $this->komentar,
            'status_ver_sempro' => $this->status_ver_sempro,
            'nama_pembimbing_1' => $this->r_pembimbing_1->nama_dosen,
            'pembimbing_1_id' => $this->r_pembimbing_1_id,
            'nama_pembimbing_2' => $this->r_pembimbing_2->nama_dosen,
            'pembimbing_2_id' => $this->r_pembimbing_2_id,
            'nama_penguji' => $this->r_penguji->nama_dosen,
            'penguji_id' => $this->penguji_id,

            'tgl_sidang' => $tanggalSidang ?? null,
            'sesi_sidang' => $sesi ?? null,
            'ruangan_sidang' => $ruangan ?? null,

            'tgl_booking' => $jadwal_sidang[0]->tgl_booking ?? null,
            'sesi_id' => $jadwal_sidang[0]->sesi_id ?? null,
            'ruangan_id' => $jadwal_sidang[0]->ruangan_id ?? null,
            'status_booking' => $jadwal_sidang[0]->status_booking ?? null,
            'id_booking' => $jadwal_sidang[0]->id_booking ?? null,

            'id_mahasiswa' => $this->r_mahasiswa->id_mahasiswa,
            'nama_mahasiswa' => $this->r_mahasiswa->nama_mahasiswa,
            'nim_mahasiswa' => $this->r_mahasiswa->nim_mahasiswa,
            'prodi' => $this->r_mahasiswa->r_kelas->r_prodi->nama_prodi,
            'jenjang' => $this->r_mahasiswa->r_kelas->r_prodi->jenjang,
            'jurusan' => $this->r_mahasiswa->r_kelas->r_prodi->r_jurusan->nama_jurusan,
            'foto_mahasiswa' => $fotoProfile,
        ];
    }
}
