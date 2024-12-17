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
        Schema::create('ta_mhs', function (Blueprint $table) {
            $table->bigInteger('id_ta_mhs')->primary()->unsigned();
            $table->bigInteger('mahasiswa_id')->unsigned();
            $table->bigInteger('pembimbing_1_id')->unsigned()->nullable();
            $table->bigInteger('pembimbing_2_id')->unsigned()->nullable();
            $table->bigInteger('ketua_id')->unsigned()->nullable();
            $table->bigInteger('sekretaris_id')->unsigned()->nullable();
            $table->bigInteger('penguji_1_id')->unsigned()->nullable();
            $table->bigInteger('penguji_2_id')->unsigned()->nullable();
            $table->string('judul')->nullable();
            $table->text('file_proposal')->nullable();
            $table->text('file_ta')->nullable();
            $table->text('komentar_ta')->nullable();
            $table->text('komentar_proposal')->nullable();
            $table->text('komentar_judul')->nullable();
            $table->enum('acc_pembimbing_satu', ['0', '1', '2'])
                ->default('2')
                ->comment('0 = Ditolak, 1 = Diterima, 2 = Proses');
            $table->enum('acc_pembimbing_dua', ['0', '1', '2'])
                ->default('2')
                ->comment('0 = Ditolak, 1 = Diterima, 2 = Proses');
            $table->enum('status_ver_ta', ['0', '1', '2', '3'])
                ->default('1')
                ->comment('0 = Ditolak, 1 = Proses, 2 = Diterima, 3 = Revisi');
            $table->enum('status_ver_proposal', ['0', '1', '2', '3'])
                ->default('1')
                ->comment('0 = Ditolak, 1 = Proses, 2 = Diterima, 3 = Revisi');
            $table->enum('status_judul', ['0', '1', '2', '3'])
                ->default('1')
                ->comment('0 = Ditolak, 1 = Proses, 2 = Diterima, 3 = Revisi');
            $table->enum('status_sidang_ta', ['0', '1', '2', '3'])
                ->default('1')
                ->comment('0 = Ditolak, 1 = Proses, 2 = Diterima, 3 = Revisi');
            $table->timestamps();
        });

        Schema::table('ta_mhs', function (Blueprint $table) {
            $table->foreign('pembimbing_1_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('pembimbing_2_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('penguji_1_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('penguji_2_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('ketua_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('sekretaris_id')->references('id_dosen')->on('dosens')
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
        Schema::dropIfExists('ta_mhs');
    }
};
