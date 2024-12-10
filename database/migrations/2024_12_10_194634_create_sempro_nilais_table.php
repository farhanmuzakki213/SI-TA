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
        Schema::create('sempro_nilais', function (Blueprint $table) {
            $table->bigInteger('id_sempro_nilai')->primary()->unsigned();
            $table->bigInteger('sempro_mhs_id')->unsigned();
            $table->bigInteger('dosen_id')->unsigned();
            $table->text('nilai');
            $table->enum('sebagai', ['pembimbing_1', 'pembimbing_2', 'penguji']);
            $table->timestamps();
        });

        Schema::table('sempro_nilais', function (Blueprint $table) {
            $table->foreign('sempro_mhs_id')->references('id_sempro_mhs')->on('sempro_mhs')
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
        Schema::dropIfExists('sempro_nilais');
    }
};
