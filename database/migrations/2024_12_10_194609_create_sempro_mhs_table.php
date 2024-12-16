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
        Schema::create('sempro_mhs', function (Blueprint $table) {
            $table->bigInteger('id_sempro_mhs')->primary()->unsigned();
            $table->bigInteger('mahasiswa_id')->unsigned();
            $table->bigInteger('pembimbing_1_id')->unsigned()->nullable();
            $table->bigInteger('pembimbing_2_id')->unsigned()->nullable();
            $table->bigInteger('penguji_id')->unsigned()->nullable();
            $table->string('judul_sempro');
            $table->text('file_sempro');
            $table->string('komentar')->nullable();
            $table->enum('status_ver_sempro', ['1', '2', '3', '4'])->default('2');
            $table->enum('status_judul_sempro', ['1', '2', '3', '4'])->default('2');
            // $table->enum('status_sempro', ['1', '2', '3',]);
            $table->timestamps();
        });

        Schema::table('sempro_mhs', function (Blueprint $table) {
            $table->foreign('pembimbing_1_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
                $table->foreign('pembimbing_2_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('penguji_id')->references('id_dosen')->on('dosens')
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
        Schema::dropIfExists('sempro_mhs');
    }
};
