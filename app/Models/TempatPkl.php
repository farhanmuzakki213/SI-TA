<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempatPkl extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_tempat_pkl', 'nama_tempat_pkl', 'kode_tempat_pkl', 'alamat_tempat_pkl', 'tipe_tempat_pkl', 'logo_tempat_pkl', 'detail_info_tempat_pkl'
    ];
    protected $table = 'tempat_pkls';
    protected $primaryKey = 'id_tempat_pkl';

    public function RoleTempatPkls()
    {
        return $this->hasMany(RoleTempatPkl::class, 'tempat_pkl_id');
    }
}
