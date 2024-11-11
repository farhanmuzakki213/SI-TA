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
        Schema::create('pkl_mhs', function (Blueprint $table) {
            $table->bigInteger('id_pkl_mhs')->primary()->unsigned();
            $table->bigInteger('pembimbing_id')->unsigned();
            $table->bigInteger('penguji_id')->unsigned();
            $table->bigInteger('usulan_tempat_pkl_id')->unsigned();
            $table->string('pembimbing_pkl')->nullable();
            $table->string('dokumen_pkl')->nullable();
            $table->string('judul')->nullable();
            $table->string('dokumen_nilai_industri')->nullable();
            $table->enum('status_ver_pkl', ['0', '1', '2'])->default('0')->nullable();
            $table->timestamps();
        });

        Schema::table('pkl_mhs', function (Blueprint $table) {
            $table->foreign('pembimbing_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('penguji_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('usulan_tempat_pkl_id')->references('id_usulan')->on('usulan_tempat_pkls')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pkl_mhs');
    }
};
