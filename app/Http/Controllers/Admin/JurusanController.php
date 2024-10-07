<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Jurusan;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JurusanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_jurusan = Jurusan::get();
        $nextNumber = $this->getCariNomor();
        // dd($data_jurusan->toArray());
        return Inertia::render('main/admin/jurusan/jurusan', [
            'nextNumber' => $nextNumber,
            'data_jurusan' => $data_jurusan
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
            'id_jurusan' => 'required',
            'nama_jurusan' => ['required', 'string', 'max:255', 'unique:' . Jurusan::class],
            'kode_jurusan' => ['required', 'string', 'max:255', 'unique:' . Jurusan::class],
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
            return to_route('jurusan')->with('error', 'Jurusan created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Jurusan $jurusan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jurusan $jurusan)
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
            'nama_jurusan' => ['required', 'string', 'max:255'],
            'kode_jurusan' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
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
    public function destroy(Jurusan $jurusan)
    {
        // dd($jurusan->toArray());
        $jurusan = Jurusan::findOrFail($jurusan->id_jurusan);

        // Cek apakah jurusan_id ada di tabel prodi
        $existsInProdi = Prodi::where('jurusan_id', $jurusan->id_jurusan)->exists();

        if ($existsInProdi) {
            return back()->with('error', 'Cannot delete jurusan, it is still associated with some prodi.');
        }
        $jurusan->delete();

        return to_route('jurusan')->with('success', 'Jurusan deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:jurusans,id_jurusan',
        ]);

        $ids = $request->input('ids');

        $existingProdiCount = Prodi::whereIn('jurusan_id', $ids)->count();

        if ($existingProdiCount > 0) {
            return back()->with('error', 'Cannot delete jurusan, it is still associated with some prodi.');
        }

        Jurusan::whereIn('id_jurusan', $ids)->delete();

        return to_route('jurusan')->with('success', 'Jurusan deleted successfully');
    }

    function getCariNomor()
    {
        $id_jurusan = Jurusan::pluck('id_jurusan')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_jurusan)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
