<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempatPkl extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_tempat_pkl', 'nama_tempat_pkl',
    ];
    protected $table = 'tempat_pkls';
    protected $primaryKey = 'id_tempat_pkl';

    public function Usulan()
    {
        return $this->hasMany(UsulanTempatPkl::class, 'tempat_pkl_id');
    }
}
