<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use App\Models\Smt_thnakd;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_kelas = Kelas::with('r_prodi', 'r_smt_thnakd')->get();
        $data_prodi = Prodi::all();
        $data_smt_thnakd = Smt_thnakd::all();
        $nextNumber = $this->getCariNomor();
        // dd($data_kelas->toArray(), $data_prodi->toArray(), $data_smt_thnakd->toArray());
        return Inertia::render('main/admin/kelas/kelas', [
            'data_kelas' => $data_kelas,
            'nextNumber' => $nextNumber,
            'prodiOptions' => $data_prodi->map(fn($u) => [
                'label' => $u->nama_prodi,
                'value' => $u->id_prodi
            ]),
            'smt_thnakdOptions' => $data_smt_thnakd->map(fn($u) => [
                'label' => $u->nama_smt_thnakd,
                'value' => $u->id_smt_thnakd
            ])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_kelas' => 'required',
            'nama_kelas' => ['required', 'string', 'max:255', 'unique:' . Kelas::class],
            'kode_kelas' => ['required', 'string', 'max:255', 'unique:' . Kelas::class],
            'prodi_id' => 'required|exists:prodis,id_prodi',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        $smt_thnakd_id = Smt_thnakd::where('status_smt_thnakd', '1')->pluck('id_smt_thnakd')->first();
        // dd($smt_thnakd_id);
        DB::beginTransaction();
        try {
            Kelas::create([
                'id_kelas' => $request->id_kelas,
                'kode_kelas' => $request->kode_kelas,
                'nama_kelas' => $request->nama_kelas,
                'prodi_id' => $request->prodi_id,
                'smt_thnakd_id' => $smt_thnakd_id,
            ]);
            DB::commit();

            return to_route('kelas')->with('success', 'Kelas created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('kelas')->with('error', 'Kelas created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kelas $kelas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kelas $kelas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'nama_kelas' => ['required', 'string', 'max:255'],
            'kode_kelas' => ['required', 'string', 'max:255'],
            'prodi_id' => 'required|exists:prodis,id_prodi',
            'smt_thnakd_id' => 'required|exists:smt_thnakds,id_smt_thnakd',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'kode_kelas' => $request->kode_kelas,
                'nama_kelas' => $request->nama_kelas,
                'prodi_id' => $request->prodi_id,
                'smt_thnakd_id' => $request->smt_thnakd_id,
            ];

            $kelas = Kelas::findOrFail($id);
            $kelas->update($data);
            DB::commit();
            return to_route('kelas')->with('success', 'Kelas updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('kelas')->with('error', 'Kelas updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelas $kelas)
    {
        // dd($prodi->toArray());
        $kelas = Kelas::findOrFail($kelas->id_kelas);

        $existsInMahasiswa = Mahasiswa::where('kelas_id', $kelas->id_kelas)->exists();

        if ($existsInMahasiswa) {
            return back()->with('error', 'Cannot delete Kelas, it is still associated with some table Mahasiswa.');
        }
        $kelas->delete();

        return to_route('kelas')->with('success', 'Kelas deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:kelas,id_kelas',
        ]);

        $ids = $request->input('ids');

        $existingMahasiswaCount = Mahasiswa::whereIn('kelas_id', $ids)->count();

        if ($existingMahasiswaCount > 0) {
            return back()->with('error', 'Cannot delete Kelas, it is still associated with some table Mahasiswa.');
        }

        Kelas::whereIn('id_kelas', $ids)->delete();

        return to_route('kelas')->with('success', 'Kelas deleted successfully');
    }

    function getCariNomor()
    {
        $id_kelas = Kelas::pluck('id_kelas')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_kelas)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
