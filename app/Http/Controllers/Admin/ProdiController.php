<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
        $nextNumber = $this->getCariNomor();
        // dd($data_jurusan->toArray());
        return Inertia::render('main/admin/prodi/prodi', [
            'data_prodi' => $data_prodi,
            'nextNumber' => $nextNumber,
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
            'jurusan_id' => 'required|exists:jurusans,id_jurusan',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Prodi::create([
                'id_prodi' => $request->id_prodi,
                'kode_prodi' => $request->kode_prodi,
                'nama_prodi' => $request->nama_prodi,
                'jurusan_id' => $request->jurusan_id,
            ]);
            DB::commit();

            return to_route('prodi')->with('success', 'Prodi created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('prodi')->with('error', 'Prodi created failed');
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
            'nama_prodi' => ['required', 'string', 'max:255'],
            'kode_prodi' => ['required', 'string', 'max:255'],
            'jurusan_id' => 'required|exists:jurusans,id_jurusan',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'kode_prodi' => $request->kode_prodi,
                'nama_prodi' => $request->nama_prodi,
                'jurusan_id' => $request->jurusan_id,
            ];

            $prodi = Prodi::findOrFail($id);
            $prodi->update($data);
            DB::commit();
            return to_route('prodi')->with('success', 'Prodi updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('prodi')->with('error', 'Prodi updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prodi $prodi)
    {
        // dd($prodi->toArray());
        $prodi = Prodi::findOrFail($prodi->id_prodi);

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

    function getCariNomor()
    {
        $id_prodi = Prodi::pluck('id_prodi')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_prodi)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
