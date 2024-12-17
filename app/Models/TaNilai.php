<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaNilai extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_ta_nilai','ta_mhs_id', 'dosen_id', 'nilai', 'sebagai', 'komentar'
    ];
    protected $table = 'ta_nilais';
    protected $primaryKey = 'id_ta_nilai';

    public function r_ta_mhs()
    {
        return $this->belongsTo(TaMhs::class, 'ta_mhs_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }
}
