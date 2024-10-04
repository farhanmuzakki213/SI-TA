<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PimpinanJurusan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_pimpinan_jurusan', 'jabatan_pimpinan_id','dosen_id', 'periode', 'status_pimpinan_jurusan'
    ];
    protected $table = 'pimpinan_jurusans';
    protected $primaryKey = 'id_pimpinan_jurusan';

    public function r_jabatan_pimpinan()
    {
        return $this->belongsTo(JabatanPimpinan::class, 'jabatan_pimpinan_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(JabatanPimpinan::class, 'dosen_id');
    }
}
