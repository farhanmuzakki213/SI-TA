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
        Schema::create('prodis', function (Blueprint $table) {
            $table->bigInteger('id_prodi')->primary()->unsigned();
            $table->bigInteger('jurusan_id')->unsigned();
            $table->string('kode_prodi');
            $table->string('nama_prodi');
            $table->timestamps();
        });

        Schema::table('prodis', function (Blueprint $table) {
            $table->foreign('jurusan_id')->references('id_jurusan')->on('jurusans')
                    ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prodis');
    }
};
