<?php

namespace App\Providers;

use App\Models\Dosen;
use App\Models\Pimpinan;
use Illuminate\Support\Facades\Gate;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('access-jenjang', function ($user, $requiredJenjang) {
            $userWithRelations = $user->load('mahasiswas.r_kelas.r_prodi');
            $jenjangProdi = optional(optional(optional($userWithRelations->mahasiswas)->r_kelas)->r_prodi)->jenjang;
            return $jenjangProdi === $requiredJenjang;
        });

        // Gate untuk kaprodi
        Gate::define('access-jenjang-kaprodi', function ($user, $requiredJenjang) {
            $id_dosen = Dosen::where('user_id', $user->id)->first()->id_dosen;
            $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->with('r_prodi')->first();
            $jenjangKaprodi = optional($kaprodi->r_prodi)->jenjang;
            return $jenjangKaprodi === $requiredJenjang;
        });

        // Gate untuk pembimbing
        Gate::define('access-jenjang-pembimbing', function ($user, $requiredJenjang) {
            $userWithRelations = $user->load('dosens.r_prodi');
            $jenjangPembimbing = optional(optional($userWithRelations->dosens)->r_prodi)->jenjang;
            return $jenjangPembimbing === $requiredJenjang;
        });
    }
}
