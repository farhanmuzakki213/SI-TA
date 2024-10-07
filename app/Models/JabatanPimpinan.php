<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JabatanPimpinan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_jabatan_pimpinan', 'kode_jabatan_pimpinan', 'nama_jabatan_pimpinan'
    ];
    protected $table = 'jabatan_pimpinans';
    protected $primaryKey = 'id_jabatan_pimpinan';

    public function pimpinanjurusans()
    {
        return $this->hasMany(Pimpinan::class, 'jabatan_pimpinan_id');
    }
}
