<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklLaporanResource;
use App\Http\Resources\MhsPklResource;
use App\Http\Resources\MhsPklUsulanResource;
use App\Http\Resources\MhsResource;
use App\Models\log_book_pkl;
use App\Models\Mahasiswa;
use App\Models\PklMhs;
use App\Models\RoleTempatPkl;
use App\Models\TempatPkl;
use App\Models\UsulanTempatPkl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PklController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_mhs = PklMhs::whereHas('r_usulan', function ($q) use ($id_mahasiswa) {
            $q->where('mahasiswa_id', $id_mahasiswa);
        })->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_tempat_pkl', 'r_usulan.r_role_tempat_pkl', 'r_pembimbing', 'r_penguji')
            ->get();
        $data_usulan = UsulanTempatPkl::with('r_mahasiswa', 'r_tempat_pkl', 'r_role_tempat_pkl')->where('mahasiswa_id', $id_mahasiswa)->get();
        // dd($data_mhs->toArray());
        $data_tempat = TempatPkl::all();
        $data_role = RoleTempatPkl::all();
        if (!empty($data_mhs) && isset($data_mhs[0]['id_pkl_mhs'])) {
            $data_laporan = log_book_pkl::where('pkl_mhs_id', $data_mhs[0]->id_pkl_mhs)->get();
        } else {
            $data_laporan = [];
        }
        // dd($data_usulan->toArray());
        return Inertia::render('main/mahasiswa/pkl/index', [
            'nextNumberUsulan' => CariNomor::getCariNomor(UsulanTempatPkl::class, 'id_usulan'),
            'nextNumberLaporan' => CariNomor::getCariNomor(log_book_pkl::class, 'id_log_book_pkl'),
            'data_pkl' => MhsPklResource::collection($data_mhs),
            'data_usulan' => MhsPklUsulanResource::collection($data_usulan),
            'data_laporan' => MhsPklLaporanResource::collection($data_laporan),
            'roleOptions' => $data_role->map(fn($u) => [
                'label' => $u->nama_role,
                'value' => $u->id_role_tempat_pkl,
            ]),
            'tempatOptions' => $data_tempat->map(fn($u) => [
                'label' => $u->nama_tempat_pkl,
                'value' => $u->id_tempat_pkl,
            ])
        ]);
    }


    public function storeTempatPkl(Request $request)
    {
        dd($request->all());
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        // dd($id_mahasiswa);
        $validator = Validator::make($request->all(), [
            'id_usulan' => 'required',
            'nama_tempat_pkl' => 'required',
            'nama_role' => 'required',
            'alamat_tempat_pkl' => 'required',
            'kota_perusahaan' => 'required',
            'tgl_awal_pkl' => 'required',
            'tgl_akhir_pkl' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $roleData = RoleTempatPkl::all();
            $roledatabase = $roleData->map(function ($role) {
                return [
                    'id_role_tempat_pkl' => $role->id_role_tempat_pkl,
                    'nama_role' => strtolower(str_replace(' ', '', $role->nama_role)),
                ];
            })->toArray();
            $roleform = strtolower(str_replace(' ', '', $request->nama_role));
            $matchedRole = collect($roledatabase)->first(function ($role) use ($roleform) {
                return $role['nama_role'] === $roleform;
            });
            if ($matchedRole) {
                $roleId = $matchedRole['id_role_tempat_pkl'];
            } else {
                // dd("test");
                $roleId = CariNomor::getCariNomor(RoleTempatPkl::class, 'id_role_tempat_pkl');
                RoleTempatPkl::create([
                    'id_role_tempat_pkl' => $roleId,
                    'nama_role' => $request->nama_role,
                ]);
            }

            $tempatData = TempatPkl::all();
            $tempatdatabase = $tempatData->map(function ($tempat) {
                return [
                    'id_tempat_pkl' => $tempat->id_tempat_pkl,
                    'nama_tempat_pkl' => strtolower(str_replace(' ', '', $tempat->nama_tempat_pkl)),
                ];
            })->toArray();
            $tempatform = strtolower(str_replace(' ', '', $request->nama_tempat_pkl));
            $matchedTempat = collect($tempatdatabase)->first(function ($tempat) use ($tempatform) {
                return $tempat['nama_tempat_pkl'] === $tempatform;
            });
            if ($matchedTempat) {
                $tempatId = $matchedTempat['id_tempat_pkl'];
            } else {
                $tempatId = CariNomor::getCariNomor(TempatPkl::class, 'id_tempat_pkl');
                TempatPkl::create([
                    'id_tempat_pkl' => $tempatId,
                    'nama_tempat_pkl' => $request->tempat_pkl_id,
                ]);
            }

            UsulanTempatPkl::create([
                'id_usulan' => $request->id_usulan,
                'nama_role' => $roleId,
                'nama_tempat_pkl' => $tempatId,
                'mahasiswa_id' => $id_mahasiswa,
                'alamat_tempat_pkl' => $request->alamat_tempat_pkl,
                'kota_perusahaan' => $request->kota_perusahaan,
                'tgl_awal_pkl' => $request->tgl_awal_pkl,
                'tgl_akhir_pkl' => $request->tgl_akhir_pkl,
            ]);
            // dd($data);
            DB::commit();

            return to_route('MhsPkl')->with('success', 'Usulan Tempat Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Usulan Tempat Pkl created failed', $e->getMessage());
        }
    }

    public function updateTempatPkl(Request $request, string $id)
    {
        dd($request->all(), $id);
        // dd($id_mahasiswa);
        $validator = Validator::make($request->all(), [
            'nama_tempat_pkl' => 'required',
            'nama_role' => 'required',
            'alamat_tempat_pkl' => 'required',
            'kota_perusahaan' => 'required',
            'tgl_awal_pkl' => 'required',
            'tgl_akhir_pkl' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $roleData = RoleTempatPkl::all();
            $roledatabase = $roleData->map(function ($role) {
                return [
                    'id_role_tempat_pkl' => $role->id_role_tempat_pkl,
                    'nama_role' => strtolower(str_replace(' ', '', $role->nama_role)),
                ];
            })->toArray();
            $roleform = strtolower(str_replace(' ', '', $request->nama_role));
            $matchedRole = collect($roledatabase)->first(function ($role) use ($roleform) {
                return $role['nama_role'] === $roleform;
            });
            if ($matchedRole) {
                $roleId = $matchedRole['id_role_tempat_pkl'];
            } else {
                // dd("test");
                $roleId = CariNomor::getCariNomor(RoleTempatPkl::class, 'id_role_tempat_pkl');
                RoleTempatPkl::create([
                    'id_role_tempat_pkl' => $roleId,
                    'nama_role' => $request->nama_role,
                ]);
            }

            $tempatData = TempatPkl::all();
            $tempatdatabase = $tempatData->map(function ($tempat) {
                return [
                    'id_tempat_pkl' => $tempat->id_tempat_pkl,
                    'nama_tempat_pkl' => strtolower(str_replace(' ', '', $tempat->nama_tempat_pkl)),
                ];
            })->toArray();
            $tempatform = strtolower(str_replace(' ', '', $request->nama_tempat_pkl));
            $matchedTempat = collect($tempatdatabase)->first(function ($tempat) use ($tempatform) {
                return $tempat['nama_tempat_pkl'] === $tempatform;
            });
            if ($matchedTempat) {
                $tempatId = $matchedTempat['id_tempat_pkl'];
            } else {
                $tempatId = CariNomor::getCariNomor(TempatPkl::class, 'id_tempat_pkl');
                TempatPkl::create([
                    'id_tempat_pkl' => $tempatId,
                    'nama_tempat_pkl' => $request->tempat_pkl_id,
                ]);
            }
            $data = [
                'nama_role' => $roleId,
                'nama_tempat_pkl' => $tempatId,
                'alamat_tempat_pkl' => $request->alamat_tempat_pkl,
                'kota_perusahaan' => $request->kota_perusahaan,
                'tgl_awal_pkl' => $request->tgl_awal_pkl,
                'tgl_akhir_pkl' => $request->tgl_akhir_pkl,
            ];
            $tempatpkl = UsulanTempatPkl::findOrFail($id);
            $tempatpkl->update($data);

            DB::commit();
            return to_route('MhsPkl')->with('success', 'Usulan Tempat Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Usulan Tempat Pkl updated failed');
        }
    }
}
