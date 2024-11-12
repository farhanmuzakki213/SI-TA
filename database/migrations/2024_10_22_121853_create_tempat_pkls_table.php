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
        Schema::create('tempat_pkls', function (Blueprint $table) {
            $table->bigInteger('id_tempat_pkl')->primary()->unsigned();
            $table->string('nama_tempat_pkl');
            $table->string('kode_tempat_pkl')->nullable();
            $table->string('alamat_tempat_pkl');
            $table->string('tipe_tempat_pkl');
            $table->text('logo_tempat_pkl')->nullable();
            $table->string('detail_info_tempat_pkl')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tempat_pkls');
    }
};
