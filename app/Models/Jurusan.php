<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jurusan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_jurusan', 'kode_jurusan', 'nama_jurusan'
    ];
    protected $table = 'jurusans';
    protected $primaryKey = 'id_jurusan';
}
