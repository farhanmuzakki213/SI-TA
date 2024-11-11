<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempatPkl extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_tempat_pkl', 'nama_perusahaan', 'alamat_perusahaan', 'nomor_telepon_perusahaan'
    ];
    protected $table = 'tempat_pkls';
    protected $primaryKey = 'id_tempat_pkl';

    public function RoleTempatPkls()
    {
        return $this->hasMany(RoleTempatPkl::class, 'tempat_pkl_id');
    }
}
