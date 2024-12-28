<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemproBimbingan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_bimbingan_mhs', 'sempro_mhs_id', 'dosen_id', 'pembahasan', 'file_bimbingan', 'komentar', 'sebagai', 'status_bimbingan_sempro'
    ];
    protected $table = 'sempro_bimbingans';
    protected $primaryKey = 'id_bimbingan_mhs';

    public function r_sempro_mhs()
    {
        return $this->belongsTo(SemproMhs::class, 'sempro_mhs_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }
}
