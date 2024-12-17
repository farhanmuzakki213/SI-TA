<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaBimbingan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_bimbingan_mhs','ta_mhs_id', 'dosen_id', 'pembahasan', 'komentar', 'sebagai', 'status_bimbingan_ta'
    ];
    protected $table = 'ta_bimbingans';
    protected $primaryKey = 'id_bimbingan_mhs';

    public function r_sempro_mhs()
    {
        return $this->belongsTo(TaMhs::class, 'ta_mhs_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }
}
