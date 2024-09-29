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
        Schema::create('pimpinan_jurusans', function (Blueprint $table) {
            $table->bigInteger('id_pimpinan_jurusan')->primary()->unsigned();
            $table->bigInteger('jabatan_pimpinan_id')->unsigned();
            $table->bigInteger('dosen_id')->unsigned();
            $table->string('periode');
            $table->enum('status_pimpinan_jurusan', ['0', '1'])->default('1');
            $table->timestamps();
        });

        Schema::table('pimpinan_jurusans', function (Blueprint $table) {
            $table->foreign('jabatan_pimpinan_id')->references('id_jabatan_pimpinan')->on('jabatan_pimpinans')
                ->onUpdate('cascade');
            $table->foreign('dosen_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pimpinan_jurusans');
    }
};
