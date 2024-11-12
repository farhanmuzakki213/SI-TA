<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\RoleTempatPkl;
use App\Models\TempatPkl;
use App\Models\UsulanTempatPkl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UsulanTempatPklController extends Controller
{
    public function index()
    {
        $data_tempat = TempatPkl::all();
        $data_role = RoleTempatPkl::all();
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_usulan = UsulanTempatPkl::with('r_mahasiswa', 'r_roleTempatPkls.r_tempatPkls')->where('mahasiswa_id', $id_mahasiswa)->get();
        $data_tempat = RoleTempatPkl::with("r_tempatPkls")->get();
        // dd($data_usulan->toArray());
        $nextNumber = $this->getCariNomor();
        return Inertia::render('main/mahasiswa/tempatpkl/tempatpkl', [
            'nextNumber' => $nextNumber,
            'data_usulan' => $data_usulan,
            'data_tempats' => $data_tempat,
            'roleOptions' => $data_role->map(fn($u) => [
                'label' => $u->role_tempat_pkl,
                'value' => $u->id_role_tempat_pkl,
                'tempat_pkl_id' => $u->tempat_pkl_id
            ]),
            'tempatOptions' => $data_tempat->map(fn($u) => [
                'label' => $u->nama_perusahaan,
                'value' => $u->id_tempat_pkl
            ])
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        // dd($id_mahasiswa);
        $validator = Validator::make($request->all(), [
            'id_usulan' => 'required',
            'role_tempat_pkl_id' => 'required|exists:role_tempat_pkls,id_role_tempat_pkl',
            'tgl_awal_pkl' => 'required',
            'tgl_akhir_pkl' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            UsulanTempatPkl::create([
                'id_usulan' => $request->id_usulan,
                'role_tempat_pkl_id' => $request->role_tempat_pkl_id,
                'mahasiswa_id' => $id_mahasiswa,
                'tgl_awal_pkl' => $request->tgl_awal_pkl,
                'tgl_akhir_pkl' => $request->tgl_akhir_pkl,
            ]);
            DB::commit();

            return to_route('tempatpkl')->with('success', 'Usulan Tempat Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('tempatpkl')->with('error', 'Usulan Tempat Pkl created failed');
        }
    }

    // public function update(Request $request, $id)
    // {
    //     // dd($request->all());
    //     $validator = Validator::make($request->all(), [
    //         'nama_prodi' => ['required', 'string', 'max:255'],
    //         'kode_prodi' => ['required', 'string', 'max:255'],
    //         'jurusan_id' => 'required|exists:jurusans,id_jurusan',
    //     ]);

    //     if ($validator->fails()) {
    //         return back()->with('error', $validator->errors()->first());
    //     }
    //     DB::beginTransaction();
    //     try {
    //         $data = [
    //             'kode_prodi' => $request->kode_prodi,
    //             'nama_prodi' => $request->nama_prodi,
    //             'jurusan_id' => $request->jurusan_id,
    //         ];

    //         $prodi = Prodi::findOrFail($id);
    //         $prodi->update($data);
    //         DB::commit();
    //         return to_route('prodi')->with('success', 'Prodi updated successfully');
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return to_route('prodi')->with('error', 'Prodi updated failed');
    //     }
    // }

    function getCariNomor()
    {
        $id_usulan = UsulanTempatPkl::pluck('id_usulan')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_usulan)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
