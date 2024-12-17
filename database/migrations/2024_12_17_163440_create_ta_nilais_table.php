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
        Schema::create('ta_nilais', function (Blueprint $table) {
            $table->bigInteger('id_ta_nilai')->primary()->unsigned();
            $table->bigInteger('ta_mhs_id')->unsigned();
            $table->bigInteger('dosen_id')->unsigned();
            $table->text('nilai');
            $table->text('komentar');
            $table->enum('sebagai', ['pembimbing_1', 'pembimbing_2', 'ketua', 'sekretaris', 'penguji_1', 'penguji_2']);
            $table->timestamps();
        });

        Schema::table('ta_nilais', function (Blueprint $table) {
            $table->foreign('ta_mhs_id')->references('id_ta_mhs')->on('ta_mhs')
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
        Schema::dropIfExists('ta_nilais');
    }
};
