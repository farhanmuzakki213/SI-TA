<?php

namespace App\Http\Resources;

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
        $fotoProfile = $this->r_mahasiswa->r_user->images ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80";
        return [
            'id_sempro_mhs' => $this->id_sempro_mhs,
            'judul_sempro' => $this->judul_sempro,
            'file_sempro' => $this->file_sempro,
            'komentar' => $this->komentar,
            'status' => $this->status_ver_sempro,

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
