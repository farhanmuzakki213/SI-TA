<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemproNilai extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_sempro_nilai','sempro_mhs_id', 'dosen_id', 'nilai', 'sebagai'
    ];
    protected $table = 'sempro_nilais';
    protected $primaryKey = 'id_sempro_nilai';

    public function r_sempro_mhs()
    {
        return $this->belongsTo(SemproMhs::class, 'sempro_mhs_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }
}
