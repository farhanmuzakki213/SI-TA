<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PklNilai extends Model
{
    use HasFactory;

    protected $fillable = [
        'pkl_mhs_id', 'dosen_id', 'nilai', 'sebagai'
    ];
    protected $table = 'pkl_nilais';
    protected $primaryKey = 'pkl_mhs_id';

    public function r_pkl_mhs()
    {
        return $this->belongsTo(PklMhs::class, 'pkl_mhs_id');
    }

    public function r_dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }
}
