<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_dosen', 'user_id', 'prodi_id', 'nama_dosen' ,'nidn_dosen', 'gender', 'status_dosen'
    ];
    protected $table = 'dosens';
    protected $primaryKey = 'id_dosen';

    public function r_user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function r_prodi()
    {
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }

    protected $guarded = [];
}
