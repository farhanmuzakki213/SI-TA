<?php

namespace App\Http\Resources;

use App\Models\Dosen;
use App\Models\Pimpinan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $id_dosen = Dosen::where('user_id', $this->id)->first()?->id_dosen;
        $kaprodi = $this->hasRole('pimpinanProdi')
            ? Pimpinan::where('dosen_id', $id_dosen)->with('r_prodi')->first()
            : null;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $this->getRoleNames(),
            'permissions' => $this->getPermissionNames(),
            'jenjangProdi' => $this->whenLoaded('mahasiswas', function () {
                return optional($this->mahasiswas->r_kelas->r_prodi)->jenjang;
            }),
            'jenjangProdiPembimbing' => $this->whenLoaded('dosens', function () {
                return optional($this->dosens->r_prodi)->jenjang;
            }),
            'jenjangProdiKaprodi' => $kaprodi ? $kaprodi->r_prodi->jenjang : null,
        ];
    }
}
