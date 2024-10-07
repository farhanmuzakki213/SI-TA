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
        Schema::create('kelas', function (Blueprint $table) {
            $table->bigInteger('id_kelas')->primary()->unsigned();
            $table->bigInteger('prodi_id')->unsigned();
            $table->bigInteger('smt_thnakd_id')->unsigned();
            $table->string('kode_kelas');
            $table->string('nama_kelas');
            $table->timestamps();
        });

        Schema::table('kelas', function (Blueprint $table) {
            $table->foreign('prodi_id')->references('id_prodi')->on('prodis')
                ->onUpdate('cascade');
            $table->foreign('smt_thnakd_id')->references('id_smt_thnakd')->on('smt_thnakds')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};
