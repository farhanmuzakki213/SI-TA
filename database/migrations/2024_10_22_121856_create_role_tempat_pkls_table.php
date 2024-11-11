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
        Schema::create('role_tempat_pkls', function (Blueprint $table) {
            $table->bigInteger('id_role_tempat_pkl')->primary()->unsigned();
            $table->bigInteger('tempat_pkl_id')->unsigned();
            $table->string('role_tempat_pkl');
            $table->bigInteger('kuota');
            $table->enum('status_tempat_pkl', ['0', '1'])->default('1');
            $table->timestamps();
        });

        Schema::table('role_tempat_pkls', function (Blueprint $table) {
            $table->foreign('tempat_pkl_id')->references('id_tempat_pkl')->on('tempat_pkls')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_tempat_pkls');
    }
};
