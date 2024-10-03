<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_kelas', 'prodi_id', 'smt_thnakd_id', 'kode_kelas', 'nama_kelas'
    ];
    protected $table = 'kelas';
    protected $primaryKey = 'id_kelas';

    public function mahasiswas()
    {
        return $this->hasMany(Mahasiswa::class, 'kelas_id');
    }

    public function r_prodi()
    {
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }

    public function r_smt_thnakd()
    {
        return $this->belongsTo(Smt_thnakd::class, 'smt_thnakd_id');
    }
}
