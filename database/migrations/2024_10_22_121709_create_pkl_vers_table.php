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
        Schema::create('pkl_vers', function (Blueprint $table) {
            $table->bigInteger('id_pkl_ver')->primary()->unsigned();
            $table->bigInteger('mahasiswa_id')->unsigned();
            $table->string('dokumen_pkl')->nullable();
            $table->string('dokumen_nilai_industri');
            $table->enum('status_ver_pkl', ['0', '1', '2'])->default('0');
            $table->timestamps();
        });

        Schema::table('pkl_vers', function (Blueprint $table) {
            $table->foreign('mahasiswa_id')->references('id_mahasiswa')->on('mahasiswas')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pkl_vers');
    }
};
