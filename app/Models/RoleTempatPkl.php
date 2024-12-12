<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleTempatPkl extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_role_tempat_pkl', 'nama_role'
    ];
    protected $table = 'role_tempat_pkls';
    protected $primaryKey = 'id_role_tempat_pkl';

    public function Usulan()
    {
        return $this->hasMany(UsulanTempatPkl::class, 'role_tempat_pkl_id');
    }
}
