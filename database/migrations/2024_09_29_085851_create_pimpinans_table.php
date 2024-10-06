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
        Schema::create('pimpinans', function (Blueprint $table) {
            $table->bigInteger('id_pimpinan')->primary()->unsigned();
            $table->bigInteger('jabatan_pimpinan_id')->unsigned();
            $table->bigInteger('dosen_id')->unsigned();
            $table->string('periode');
            $table->enum('status_pimpinan', ['0', '1'])->default('1');
            $table->timestamps();
        });

        Schema::table('pimpinans', function (Blueprint $table) {
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
        Schema::dropIfExists('pimpinans');
    }
};
