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
}
