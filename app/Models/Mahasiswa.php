<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_mahasiswa', 'user_id', 'kelas_id', 'nama_mahasiswa' ,'nim_mahasiswa', 'gender', 'status_mahasiswa'
    ];
    protected $table = 'mahasiswas';
    protected $primaryKey = 'id_mahasiswa';

    public function r_user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function r_kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'mahasiswa_id');
    }


    public function usulans()
    {
        return $this->hasMany(UsulanTempatPkl::class, 'mahasiswa_id');
    }

    protected $guarded = [];
}
