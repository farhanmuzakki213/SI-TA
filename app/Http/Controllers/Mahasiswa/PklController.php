<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklLaporanResource;
use App\Http\Resources\MhsPklResource;
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
        $mahasiswa = Mahasiswa::where('user_id', $id_user)->with('r_user', 'r_kelas.r_prodi.r_jurusan')->get();
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
        // dd($data_laporan->toArray());
        return Inertia::render('main/mahasiswa/pkl/index', [
            'nextNumberUsulan' => CariNomor::getCariNomor(UsulanTempatPkl::class, 'id_usulan'),
            'nextNumberLaporan' => CariNomor::getCariNomor(log_book_pkl::class, 'id_log_book_pkl'),
            'data_pkl' => MhsPklResource::collection($data_mhs),
            'data_usulan' => $data_usulan,
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
        // dd($request->all());
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        // dd($id_mahasiswa);
        $validator = Validator::make($request->all(), [
            'id_usulan' => 'required',
            'tempat_pkl_id' => 'required',
            'role_tempat_pkl_id' => 'required',
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
            $roleNames = $roleData->map(fn($role) => strtolower(str_replace(' ', '', $role->nama_role)))->toArray();
            $roleIndex = array_search(strtolower(str_replace(' ', '', $request->role_tempat_pkl_id)), $roleNames);
            if ($roleIndex !== false) {
                $roleId = $roleData[$roleIndex]->id;
            } else {
                $nextNumberRole = CariNomor::getCariNomor(RoleTempatPkl::class, 'id_role_tempat_pkl');
                $newRole = RoleTempatPkl::create([
                    'id_role_tempat_pkl' => $nextNumberRole,
                    'nama_role' => $request->role_tempat_pkl_id,
                ]);

                $roleId = $newRole->id;
            }
            $tempatData = TempatPkl::all();
            $tempatNames = $tempatData->map(function ($tempat) {
                return strtolower(preg_replace('/[^a-z0-9]/', '', $tempat->nama_tempat_pkl));
            })->toArray();
            $formattedInputTempat = strtolower(preg_replace('/[^a-z0-9]/', '', $request->tempat_pkl_id));
            $tempatIndex = array_search($formattedInputTempat, $tempatNames);

            if ($tempatIndex !== false) {
                // dd("test");
                $tempatId = $tempatData[$tempatIndex]->id;
            } else {
                $nextNumberRole = CariNomor::getCariNomor(TempatPkl::class, 'id_tempat_pkl');
                $newTempat = TempatPkl::create([
                    'nama_tempat_pkl' => $request->tempat_pkl_id,
                ]);

                $tempatId = $newTempat->id;
            }
            // UsulanTempatPkl::create(
                $data = [
                'id_usulan' => $request->id_usulan,
                'role_tempat_pkl_id' => $roleId,
                'tempat_pkl_id' => $tempatId,
                'mahasiswa_id' => $id_mahasiswa,
                'alamat_tempat_pkl' => $request->alamat_tempat_pkl,
                'kota_perusahaan' => $request->kota_perusahaan,
                'tgl_awal_pkl' => $request->tgl_awal_pkl,
                'tgl_akhir_pkl' => $request->tgl_akhir_pkl,
                ];
        // );
                dd($data);
            DB::commit();

            return to_route('MhsPkl')->with('success', 'Usulan Tempat Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Usulan Tempat Pkl created failed', $e->getMessage());
        }
    }

    public function updateTempatPkl(Request $request, string $id)
    {
        // dd($request->all());
        // dd($id_mahasiswa);
        $validator = Validator::make($request->all(), [
            'id_usulan' => 'required',
            'tempat_pkl_id' => 'required',
            'role_tempat_pkl_id' => 'required',
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
            $data = [
                'id_usulan' => $request->id_usulan,
                'role_tempat_pkl_id' => $request->role_tempat_pkl_id,
                'tempat_pkl_id' => $request->tempat_pkl_id,
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
