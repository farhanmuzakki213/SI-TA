<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class golongan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_golongan', 'nama_golongan'
    ];
    protected $table = 'golongans';
    protected $primaryKey = 'id_golongan';

    public function dosens()
    {
        return $this->hasMany(Dosen::class, 'golongan_id');
    }
}
