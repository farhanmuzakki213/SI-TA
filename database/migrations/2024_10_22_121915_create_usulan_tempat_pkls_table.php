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
        Schema::create('usulan_tempat_pkls', function (Blueprint $table) {
            $table->bigInteger('id_usulan')->primary()->unsigned();
            $table->bigInteger('tempat_pkl_id')->unsigned();
            $table->bigInteger('mahasiswa_id')->unsigned();
            $table->date('tgl_awal_pkl');
            $table->date('tgl_akhir_pkl');
            $table->longText('komentar');
            $table->enum('status_usulan', ['0', '1', '2'])->default('1');
            $table->timestamps();
        });

        Schema::table('usulan_tempat_pkls', function (Blueprint $table) {
            $table->foreign('tempat_pkl_id')->references('id_tempat_pkl')->on('tempat_pkls')
                ->onUpdate('cascade');
            $table->foreign('mahasiswa_id')->references('id_mahasiswa')->on('mahasiswas')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usulan_tempat_pkls');
    }
};
