<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PklMhs extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pkl_mhs', 'pembimbing_id', 'penguji_id', 'usulan_tempat_pkl_id', 'pembimbing_pkl', 'file_nilai', 'file_laporan', 'judul_laporan', 'nilai_industri', 'status_ver_pkl'
    ];
    protected $table = 'pkl_mhs';
    protected $primaryKey = 'id_pkl_mhs';

    protected $with = ['r_usulan', 'r_pembimbing', 'r_penguji'];

    public function scopeComplete($query)
    {
        return $query->whereNotNull('pembimbing_id')
            ->whereNotNull('penguji_id')
            ->whereHas('r_pembimbing')
            ->whereHas('r_penguji');
    }

    public function r_usulan()
    {
        return $this->belongsTo(UsulanTempatPkl::class, 'usulan_tempat_pkl_id');
    }
    public function r_pembimbing()
    {
        return $this->belongsTo(Dosen::class, 'pembimbing_id');
    }

    public function r_penguji()
    {
        return $this->belongsTo(Dosen::class, 'penguji_id');
    }
}
