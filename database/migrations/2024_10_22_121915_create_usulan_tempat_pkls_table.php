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
            $table->bigInteger('role_tempat_pkl_id')->unsigned();
            $table->bigInteger('mahasiswa_id')->unsigned();
            $table->longText('komentar')->nullable();
            $table->enum('status_usulan', ['1', '2', '3'])->default('1')
                ->comment('1 = Diproses, 2 = DiTolak, 3 = Diterima');
            $table->timestamps();
        });

        Schema::table('usulan_tempat_pkls', function (Blueprint $table) {
            $table->foreign('role_tempat_pkl_id')->references('id_role_tempat_pkl')->on('role_tempat_pkls')
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
