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
        Schema::create('mahasiswas', function (Blueprint $table) {
            $table->bigInteger('id_mahasiswa')->primary()->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('kelas_id')->unsigned();
            $table->string('nama_mahasiswa');
            $table->string('nim_mahasiswa');
            $table->enum('gender', ['laki-laki', 'perempuan']);
            $table->enum('status_mahasiswa', ['0', '1'])->default('1');
            $table->timestamps();
        });

        Schema::table('mahasiswas', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade');
            $table->foreign('kelas_id')->references('id_kelas')->on('kelas')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswas');
    }
};
