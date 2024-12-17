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
        Schema::create('ta_bimbingans', function (Blueprint $table) {
            $table->bigInteger('id_bimbingan_mhs')->primary()->unsigned();
            $table->bigInteger('ta_mhs_id')->unsigned();
            $table->bigInteger('dosen_id')->unsigned();
            $table->text('pembahasan');
            $table->text('komentar');
            $table->enum('sebagai', ['pembimbing_1', 'pembimbing_2']);
            $table->enum('status_bimbingan_ta', ['1', '2', '3'])
                ->default('1')
                ->comment('1 = Proses, 2 = Diterima, 3 = Revisi');
            $table->timestamps();
        });

        Schema::table('ta_bimbingans', function (Blueprint $table) {
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
        Schema::dropIfExists('ta_bimbingans');
    }
};
