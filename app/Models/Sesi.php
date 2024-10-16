<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sesi extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_sesi', 'periode_sesi'
    ];
    protected $table = 'sesi';
    protected $primaryKey = 'id_sesi';

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'sesi_id');
    }
}
