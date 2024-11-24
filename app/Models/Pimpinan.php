<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pimpinan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_pimpinan', 'jabatan_pimpinan_id','dosen_id', 'prodi_id', 'periode', 'status_pimpinan'
    ];
    protected $table = 'pimpinans';
    protected $primaryKey = 'id_pimpinan';

    public function r_jabatan_pimpinan()
    {
        return $this->belongsTo(JabatanPimpinan::class, 'jabatan_pimpinan_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }

    public function r_prodi()
    {
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }
}
