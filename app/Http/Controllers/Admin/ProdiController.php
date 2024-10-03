<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Prodi;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProdiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_prodi = Prodi::with('r_jurusan')->get();
        $data_jurusan = Jurusan::all();
        // dd($data_jurusan->toArray());
        return Inertia::render('main/admin/prodi/prodi', [
            'data_prodi' => $data_prodi,
            'jurusanOptions' => $data_jurusan->map(fn($u) => [
                'label' => $u->nama_jurusan,
                'value' => $u->id_jurusan
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
            'id_prodi' => 'required',
            'nama_prodi' => ['required', 'string', 'max:255', 'unique:' . Prodi::class],
            'kode_prodi' => ['required', 'string', 'max:255', 'unique:' . Prodi::class],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Jurusan::create([
                'id_jurusan' => $request->id_jurusan,
                'kode_jurusan' => $request->kode_jurusan,
                'nama_jurusan' => $request->nama_jurusan,
            ]);
            DB::commit();

            return to_route('jurusan')->with('success', 'Jurusan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create dosen',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Prodi $prodi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prodi $prodi)
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
            'nama_jurusan' => ['required', 'string', 'max:255', 'unique:' . Jurusan::class],
            'kode_jurusan' => ['required', 'string', 'max:255', 'unique:' . Jurusan::class],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        // dd($request->nim_mahasiswa);
        DB::beginTransaction();
        try {
            $data = [
                'nama_jurusan' => $request->nama_jurusan,
                'kode_jurusan' => $request->kode_jurusan,
            ];

            $jurusan = Jurusan::findOrFail($id);
            $jurusan->update($data);
            DB::commit();
            return to_route('jurusan')->with('success', 'Jurusan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('jurusan')->with('error', 'Jurusan updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prodi $prodi)
    {
        // dd($jurusan->toArray());
        $prodi = Prodi::findOrFail($prodi->id_prodi);

        // Cek apakah jurusan_id ada di tabel prodi
        $existsInDosen = Dosen::where('prodi_id', $prodi->id_prodi)->exists();
        $existsInKelas = Kelas::where('prodi_id', $prodi->id_prodi)->exists();

        if ($existsInDosen) {
            return back()->with('error', 'Cannot delete prodi, it is still associated with some table dosen.');
        }
        if ($existsInKelas) {
            return back()->with('error', 'Cannot delete prodi, it is still associated with some table kelas.');
        }
        $prodi->delete();

        return to_route('prodi')->with('success', 'Prodi deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:prodis,id_prodi',
        ]);

        $ids = $request->input('ids');

        $existingDosenCount = Dosen::whereIn('prodi_id', $ids)->count();
        $existingKelasCount = Kelas::whereIn('prodi_id', $ids)->count();

        if ($existingDosenCount > 0) {
            return back()->with('error', 'Cannot delete prodi, it is still associated with some table dosen.');
        }

        if ($existingKelasCount > 0) {
            return back()->with('error', 'Cannot delete prodi, it is still associated with some table kelas.');
        }

        Prodi::whereIn('id_prodi', $ids)->delete();

        return to_route('prodi')->with('success', 'Prodi deleted successfully');
    }
}
