<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Smt_thnakd extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_smt_thnakd', 'kode_smt_thnakd', 'nama_smt_thnakd', 'status_smt_thnakd'
    ];
    protected $table = 'smt_thnakds';
    protected $primaryKey = 'id_smt_thnakd';

    public function kelas()
    {
        return $this->hasMany(Kelas::class, 'smt_thnakd_id');
    }
}
