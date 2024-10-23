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
        Schema::create('pkl_sidangs', function (Blueprint $table) {
            $table->bigInteger('id_pkl_sidang')->primary()->unsigned();
            $table->bigInteger('pkl_ver_id')->unsigned();
            $table->bigInteger('pembimbing_id')->unsigned();
            $table->bigInteger('penguji_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('pkl_sidangs', function (Blueprint $table) {
            $table->foreign('pkl_ver_id')->references('id_pkl_ver')->on('pkl_vers')
                ->onUpdate('cascade');
            $table->foreign('pembimbing_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
            $table->foreign('penguji_id')->references('id_dosen')->on('dosens')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pkl_sidangs');
    }
};
