<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsulanTempatPkl extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_usulan',  'tempat_pkl_id', 'role_tempat_pkl_id', 'kota_perusahaan', 'alamat_tempat_pkl', 'mahasiswa_id', 'tgl_awal_pkl', 'tgl_akhir_pkl', 'komentar', 'status_usulan'
    ];
    protected $table = 'usulan_tempat_pkls';
    protected $primaryKey = 'id_usulan';

    public function r_mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }

    public function r_tempat_pkl()
    {
        return $this->belongsTo(TempatPkl::class, 'tempat_pkl_id');
    }

    public function r_role_tempat_pkl()
    {
        return $this->belongsTo(RoleTempatPkl::class, 'role_tempat_pkl_id');
    }
}
