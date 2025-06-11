<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemproMhs extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_sempro_mhs', 'mahasiswa_id', 'pembimbing_1_id', 'pembimbing_2_id', 'penguji_id',  'judul_sempro', 'file_sempro', 'komentar', 'status_judul_sempro',
        'status_ver_sempro', 'status_sempro', 'acc_pembimbing_satu', 'acc_pembimbing_dua'
    ];
    protected $table = 'sempro_mhs';
    protected $primaryKey = 'id_sempro_mhs';

    protected $with = ['r_mahasiswa', 'r_pembimbing_1', 'r_pembimbing_2', 'r_penguji'];

    public function scopeComplete($query)
    {
        return $query->whereNotNull('pembimbing_1_id')
            ->whereNotNull('pembimbing_2_id')
            ->whereNotNull('penguji_id')
            ->whereHas('r_pembimbing_1')
            ->whereHas('r_pembimbing_2')
            ->whereHas('r_penguji');
    }
    public function r_pembimbing_1()
    {
        return $this->belongsTo(Dosen::class, 'pembimbing_1_id');
    }

    public function r_pembimbing_2()
    {
        return $this->belongsTo(Dosen::class, 'pembimbing_2_id');
    }

    public function r_penguji()
    {
        return $this->belongsTo(Dosen::class, 'penguji_id');
    }

    public function r_mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }
}
