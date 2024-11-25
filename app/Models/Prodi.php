<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_prodi', 'jurusan_id', 'kode_prodi', 'nama_prodi'
    ];
    protected $table = 'prodis';
    protected $primaryKey = 'id_prodi';

    public function dosens()
    {
        return $this->hasMany(Dosen::class, 'prodi_id');
    }

    public function kelas()
    {
        return $this->hasMany(Kelas::class, 'prodi_id');
    }

    public function pimpimam()
    {
        return $this->hasMany(Pimpinan::class, 'prodi_id');
    }

    public function r_jurusan()
    {
        return $this->belongsTo(Jurusan::class, 'jurusan_id');
    }
}
