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
        Schema::create('pkl_nilais', function (Blueprint $table) {
            $table->bigInteger('pkl_sidang_id')->unsigned();
            $table->bigInteger('dosen_id')->unsigned();
            $table->text('nilai');
            $table->enum('sebagai', ['pembimbing', 'penguji']);
            $table->timestamps();
        });

        Schema::table('pkl_nilais', function (Blueprint $table) {
            $table->foreign('pkl_sidang_id')->references('id_pkl_sidang')->on('pkl_sidangs')
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
        Schema::dropIfExists('pkl_nilais');
    }
};
