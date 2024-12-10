<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class log_book_pkl extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_log_book_pkl', 'pkl_mhs_id', 'tgl_awal_kegiatan', 'tgl_akhir_kegiatan', 'dokumen_laporan', 'status', 'komentar', 'kegiatan'
    ];
    protected $table = 'log_book_pkls';
    protected $primaryKey = 'id_log_book_pkl';

    public function r_pkl_mhs()
    {
        return $this->belongsTo(PklMhs::class, 'pkl_mhs_id');
    }
}
