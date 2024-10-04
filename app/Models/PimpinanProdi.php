<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PimpinanProdi extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_pimpinan_prodi', 'jabatan_pimpinan_id','dosen_id', 'periode', 'status_pimpinan_prodi'
    ];
    protected $table = 'pimpinan_prodis';
    protected $primaryKey = 'id_pimpinan_prodi';

    public function r_jabatan_pimpinan()
    {
        return $this->belongsTo(JabatanPimpinan::class, 'jabatan_pimpinan_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(JabatanPimpinan::class, 'dosen_id');
    }
}
