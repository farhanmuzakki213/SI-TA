<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('log_book_pkls', function (Blueprint $table) {
            $table->bigInteger('id_log_book_pkl')->primary()->unsigned();
            $table->bigInteger('pkl_mhs_id')->unsigned();
            $table->date('tgl_awal_kegiatan');
            $table->date('tgl_akhir_kegiatan');
            $table->string('dokumen_laporan');
            $table->string('status');
            $table->string('komentar');
            $table->timestamps();
        });

        Schema::table('log_book_pkls', function (Blueprint $table) {
            $table->foreign('pkl_mhs_id')->references('id_pkl_mhs')->on('pkl_mhs')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_book_pkls');
    }
};
