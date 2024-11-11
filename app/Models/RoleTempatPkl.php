<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleTempatPkl extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_role_tempat_pkl', 'tempat_pkl_id', 'role_tempat_pkl' , 'kuota', 'status_tempat_pkl'
    ];
    protected $table = 'role_tempat_pkls';
    protected $primaryKey = 'id_role_tempat_pkl';
    public function UsulanTempatPkls()
    {
        return $this->hasMany(UsulanTempatPkl::class, 'role_tempat_pkl_id');
    }

    public function r_tempatPkls()
    {
        return $this->belongsTo(TempatPkl::class, 'tempat_pkl_id');
    }
}
