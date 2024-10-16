<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_booking', 'ruangan_id', 'sesi_id', 'mahasiswa_id', 'tipe', 'tgl_booking'
    ];
    protected $table = 'booking';
    protected $primaryKey = 'id_booking';

    public function r_mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }

    public function r_ruangan()
    {
        return $this->belongsTo(Ruangan::class, 'ruangan_id');
    }

    public function r_sesi()
    {
        return $this->belongsTo(Sesi::class, 'sesi_id');
    }
}
