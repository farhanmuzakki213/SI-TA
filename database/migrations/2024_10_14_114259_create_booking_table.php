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
        Schema::create('booking', function (Blueprint $table) {
            $table->bigInteger('id_booking')->primary()->unsigned();
            $table->bigInteger('ruangan_id')->unsigned();
            $table->bigInteger('sesi_id')->unsigned();
            $table->bigInteger('mahasiswa_id')->unsigned();
            $table->enum('tipe', ['1', '2', '3']);
            $table->date('tgl_booking');
            $table->enum('status_booking', ['0', '1'])->default('1');
            $table->timestamps();
        });
        Schema::table('booking', function (Blueprint $table) {
            $table->foreign('ruangan_id')->references('id_ruangan')->on('ruangan')
                ->onUpdate('cascade');
            $table->foreign('sesi_id')->references('id_sesi')->on('sesi')
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
        Schema::dropIfExists('booking');
    }
};
