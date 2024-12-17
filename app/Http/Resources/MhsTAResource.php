<?php

namespace App\Http\Resources;

use App\Models\Booking;
use App\Models\TaNilai;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MhsTAResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $jadwal_sidang = Booking::where('mahasiswa_id', $this->mahasiswa_id)->where('tipe', '3')->where('status_booking', '1')->with('r_sesi', 'r_ruangan')->get();
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

        $pembimbing_1 = TaNilai::where('dosen_id', $this->pembimbing_1_id)->where('ta_mhs_id', $this->id_ta_mhs)->where('sebagai', 'pembimbing_1')->first();
        $pembimbing_2 = TaNilai::where('dosen_id', $this->pembimbing_2_id)->where('ta_mhs_id', $this->id_ta_mhs)->where('sebagai', 'pembimbing_2')->first();
        $penguji_1 = TaNilai::where('dosen_id', $this->penguji_1_id)->where('ta_mhs_id', $this->id_ta_mhs)->where('sebagai', 'penguji_1')->first();
        $penguji_2 = TaNilai::where('dosen_id', $this->penguji_2_id)->where('ta_mhs_id', $this->id_ta_mhs)->where('sebagai', 'penguji_2')->first();
        $ketua = TaNilai::where('dosen_id', $this->ketua_id)->where('ta_mhs_id', $this->id_ta_mhs)->where('sebagai', 'ketua')->first();
        $sekretaris = TaNilai::where('dosen_id', $this->sekretaris_id)->where('ta_mhs_id', $this->id_ta_mhs)->where('sebagai', 'sekretaris')->first();

        if ($this->status_sidang_ta == '1') {
            $status = 'Ditolak';
        } else if ($this->status_sidang_ta == '2') {
            $status = 'Belum diverifikasi';
        } else if ($this->status_sidang_ta == '3') {
            $status = 'Diterima';
        } else {
            $status = 'Butuh Revisi';
        }
        return [
            'id_ta_mhs' => $this->id_ta_mhs,
            'judul' => $this->judul,
            'file_ta' => $this->file_ta,
            'file_proposal' => $this->file_proposal,
            'komentar_ta' => $this->komentar_ta,
            'komentar_proposal' => $this->komentar_proposal,
            'komentar_judul' => $this->komentar_judul,
            'acc_pembimbing_satu' => $this->acc_pembimbing_satu,
            'acc_pembimbing_dua' => $this->acc_pembimbing_dua,
            'status_ver_ta' => $this->status_ver_ta,
            'status_ver_proposal' => $this->status_ver_proposal,
            'status_judul' => $this->status_judul,
            'status_sidang_ta' => $this->status_sidang_ta,
            'status' => $status,

            'nama_pembimbing_1' => $this->r_pembimbing_1->nama_dosen ?? null,
            'pembimbing_1_id' => $this->pembimbing_1_id ?? null,
            'nama_pembimbing_2' => $this->r_pembimbing_2->nama_dosen ?? null,
            'pembimbing_2_id' => $this->pembimbing_2_id ?? null,
            'nama_penguji_1' => $this->r_penguji_1->nama_dosen ?? null,
            'penguji_1_id' => $this->penguji_1_id ?? null,
            'nama_penguji_2' => $this->r_penguji_2->nama_dosen ?? null,
            'penguji_2_id' => $this->penguji_2_id ?? null,
            'nama_ketua' => $this->r_ketua->nama_dosen ?? null,
            'ketua_id' => $this->ketua_id ?? null,
            'nama_sekretaris' => $this->r_sekretaris->nama_dosen ?? null,
            'sektretaris_id' => $this->sektretaris_id ?? null,

            'nilai_pembimbing_1' => $pembimbing_1 ? $pembimbing_1->nilai : null,
            'komentar_pembimbing_1' => $pembimbing_1 ? $pembimbing_1->komentar : null,
            'nilai_pembimbing_2' => $pembimbing_2 ? $pembimbing_2->nilai : null,
            'komentar_pembimbing_2' => $pembimbing_2 ? $pembimbing_2->komentar : null,
            'nilai_penguji_1' => $penguji_1 ? $penguji_1->nilai : null,
            'komentar_penguji_1' => $penguji_1 ? $penguji_1->komentar : null,
            'nilai_penguji_2' => $penguji_2 ? $penguji_2->nilai : null,
            'komentar_penguji_2' => $penguji_2 ? $penguji_2->komentar : null,
            'nilai_ketua' => $ketua ? $ketua->nilai : null,
            'komentar_ketua' => $ketua ? $ketua->komentar : null,
            'nilai_sekretaris' => $sekretaris ? $sekretaris->nilai : null,
            'komentar_sekretaris' => $sekretaris ? $sekretaris->komentar : null,

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
