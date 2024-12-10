<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemproMhs extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_sempro_mhs', 'mahasiswa_id', 'pembimbing_1_id', 'pembimbing_2_id', 'penguji_id',  'judul_sempro', 'file_sempro', 'status_ver_sempro'
    ];
    protected $table = 'sempro_mhs';
    protected $primaryKey = 'id_sempro_mhs';
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
