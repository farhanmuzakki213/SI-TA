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
use Illuminate\Support\Facades\Storage;
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
        // dd($request->all());
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
                    'nama_tempat_pkl' => $request->nama_tempat_pkl,
                ]);
            }
            // dd($tempatId, $roleId);

            UsulanTempatPkl::create([
                'id_usulan' => $request->id_usulan,
                'role_tempat_pkl_id' => $roleId,
                'tempat_pkl_id' => $tempatId,
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
            return to_route('MhsPkl')->with('error', 'Usulan Tempat Pkl created failed 123', $e->getMessage());
        }
    }

    public function updateTempatPkl(Request $request, string $id)
    {
        // dd($request->all(), $id);
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
                    'nama_tempat_pkl' => $request->nama_tempat_pkl,
                ]);
            }
            $data = [
                'role_tempat_pkl_id' => $roleId,
                'tempat_pkl_id' => $tempatId,
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

    public function storeLaporan(Request $request)
    {
        dd($request->all());
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $pkl_mhs_id = PklMhs::whereHas('r_usulan', function ($q) use ($id_mahasiswa) {
            $q->where('mahasiswa_id', $id_mahasiswa);
        })->first()->id_pkl_mhs;
        // dd($request->all(), $pkl_mhs_id);
        // dd($id_mahasiswa, $pkl_mhs_id);
        $validator = Validator::make($request->all(), [
            'id_log_book_pkl' => 'required',
            'kegiatan' => 'required',
            'tgl_awal_kegiatan' => 'required|date',
            'tgl_akhir_kegiatan' => 'required|date|after_or_equal:tgl_awal_kegiatan',
            'dokumen_laporan' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            if ($request->hasFile('dokumen_laporan')) {
                $file = $request->file('dokumen_laporan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/pkl/laporan/';
                $file->storeAs($path, $filename);
                log_book_pkl::create([
                    'id_log_book_pkl' => $request->id_log_book_pkl,
                    'kegiatan' => $request->kegiatan,
                    'pkl_mhs_id' => $pkl_mhs_id,
                    'tgl_awal_kegiatan' => $request->tgl_awal_kegiatan,
                    'tgl_akhir_kegiatan' => $request->tgl_akhir_kegiatan,
                    'dokumen_laporan' => $filename
                ]);
            }
            DB::commit();

            return to_route('MhsPkl')->with('success', 'Laporan Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Laporan Pkl created failed');
        }
    }

    public function updateLaporan(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'kegiatan' => 'required',
            'tgl_awal_kegiatan' => 'required|date',
            'tgl_akhir_kegiatan' => 'required|date|after_or_equal:tgl_awal_kegiatan',
            'dokumen_laporan' => 'sometimes|required|mimes:pdf'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = log_book_pkl::where('id_log_book_pkl', $id)->first();
            if ($oldData->dokumen_laporan !== null && $request->hasFile('dokumen_laporan')) {
                Storage::delete('public/uploads/pkl/laporan/' . $oldData->dokumen_laporan);
            }
            $filename = null;
            if ($request->hasFile('dokumen_laporan')) {
                $file = $request->file('dokumen_laporan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/pkl/laporan/';
                $file->storeAs($path, $filename);
            }
            $data = [
                'kegiatan' => $request->kegiatan,
                'tgl_awal_kegiatan' => $request->tgl_awal_kegiatan,
                'tgl_akhir_kegiatan' => $request->tgl_akhir_kegiatan,
                'dokumen_laporan' => $filename
            ];
            // dd($data);
            $oldData->update($data);
            DB::commit();
            return to_route('MhsPkl')->with('success', 'Laporan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Laporan Pkl updated failed');
        }
    }

    public function updateSidang(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'pkl_pembimbing' => 'required|string',
            'judul' => 'required|string',
            'nilai_industri' => 'required|string',
            'file_nilai' => 'required|file|mimes:pdf|max:10240',
            'file_laporan' => 'required|file|mimes:pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $oldData = PklMhs::where('id_pkl_mhs', $id)->first();

            if ($oldData->file_laporan !== null && $request->hasFile('file_laporan')) {
                Storage::delete('public/uploads/pkl/laporan_akhir/' . $oldData->file_laporan);
            }
            $filenamelaporan = null;
            if ($request->hasFile('file_laporan')) {
                $file = $request->file('file_laporan');
                $filenamelaporan = $file->getClientOriginalName();
                $path = 'public/uploads/pkl/laporan_akhir/';
                $file->storeAs($path, $filenamelaporan);
            }

            if ($oldData->file_nilai !== null && $request->hasFile('file_nilai')) {
                Storage::delete('public/uploads/pkl/nilai_industri/' . $oldData->file_nilai);
            }
            $filenamenilai = null;
            if ($request->hasFile('file_nilai')) {
                $file = $request->file('file_nilai');
                $filenamenilai = $file->getClientOriginalName();
                $path = 'public/uploads/pkl/nilai_industri/';
                $file->storeAs($path, $filenamenilai);
            }

            $data = [
                'judul_laporan' => $request->judul,
                'pembimbing_pkl' => $request->pkl_pembimbing,
                'nilai_industri' => $request->nilai_industri,
                'file_laporan' => $filenamelaporan,
                'file_nilai' => $filenamenilai,
                'status_ver_pkl' => '2',
            ];

            $oldData->update($data);
            DB::commit();
            return to_route('MhsPkl')->with('success', 'Pengajuan Sidang updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Pengajuan Sidang updated failed'. $e->getMessage());
        }
    }
}
