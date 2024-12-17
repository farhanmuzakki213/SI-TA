<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaMhs extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_ta_mhs', 'mahasiswa_id', 'pembimbing_1_id', 'pembimbing_2_id', 'penguji_1_id', 'penguji_2_id', 'ketua_id', 'sekretaris_id', 'judul', 'file_proposal', 'file_ta', 'komentar_ta', 'komentar_proposal', 'acc_pembimbing_satu', 'acc_pembimbing_dua', 'status_ver_ta', 'status_ver_proposal', 'status_judul', 'status_sidang_ta',  'komentar_judul'
    ];
    protected $table = 'ta_mhs';
    protected $primaryKey = 'id_ta_mhs';
    public function r_pembimbing_1()
    {
        return $this->belongsTo(Dosen::class, 'pembimbing_1_id');
    }

    public function r_pembimbing_2()
    {
        return $this->belongsTo(Dosen::class, 'pembimbing_2_id');
    }

    public function r_penguji_1()
    {
        return $this->belongsTo(Dosen::class, 'penguji_1_id');
    }

    public function r_penguji_2()
    {
        return $this->belongsTo(Dosen::class, 'penguji_2_id');
    }

    public function r_ketua()
    {
        return $this->belongsTo(Dosen::class, 'ketua_id');
    }

    public function r_sekretaris()
    {
        return $this->belongsTo(Dosen::class, 'sekretaris_id');
    }

    public function r_mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }
}
