<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_ruangan', 'kode_ruangan'
    ];
    protected $table = 'ruangan';
    protected $primaryKey = 'id_ruangan';

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'ruangan_id');
    }
}
