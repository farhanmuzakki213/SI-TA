<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JabatanPimpinan;
use App\Models\Pimpinan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JabatanPimpinanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_jabatan_pimpinan = JabatanPimpinan::get();
        $nextNumber = $this->getCariNomor();
        // dd($data_jabatan_pimpinan->toArray());
        return Inertia::render('main/admin/jabatanpimpinan/jabatan', [
            'nextNumber' => $nextNumber,
            'data_jabatan_pimpinan' => $data_jabatan_pimpinan
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
            'id_jabatan_pimpinan' => 'required',
            'nama_jabatan_pimpinan' => ['required', 'string', 'max:255', 'unique:' . JabatanPimpinan::class],
            'kode_jabatan_pimpinan' => ['required', 'string', 'max:255', 'unique:' . JabatanPimpinan::class],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            JabatanPimpinan::create([
                'id_jabatan_pimpinan' => $request->id_jabatan_pimpinan,
                'kode_jabatan_pimpinan' => $request->kode_jabatan_pimpinan,
                'nama_jabatan_pimpinan' => $request->nama_jabatan_pimpinan,
            ]);
            DB::commit();

            return to_route('jabatanpimpinan')->with('success', 'Jabatan Pimpinan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('jabatanpimpinan')->with('error', 'Jabatan Pimpinan created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(JabatanPimpinan $jabatanPimpinan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JabatanPimpinan $jabatanPimpinan)
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
            'nama_jabatan_pimpinan' => ['required', 'string', 'max:255'],
            'kode_jabatan_pimpinan' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'nama_jabatan_pimpinan' => $request->nama_jabatan_pimpinan,
                'kode_jabatan_pimpinan' => $request->kode_jabatan_pimpinan,
            ];

            $jabatan_pimpinan = JabatanPimpinan::findOrFail($id);
            $jabatan_pimpinan->update($data);
            DB::commit();
            return to_route('jabatanpimpinan')->with('success', 'Jabatan Pimpinan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('jabatanpimpinan')->with('error', 'Jabatan Pimpinan updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JabatanPimpinan $jabatan_pimpinan)
    {
        // dd($jurusan->toArray());
        $jabatan_pimpinan = JabatanPimpinan::findOrFail($jabatan_pimpinan->id_jabatan_pimpinan);

        $existsInPimpinan = Pimpinan::where('jabatan_pimpinan_id', $jabatan_pimpinan->id_jabatan_pimpinan)->exists();

        if ($existsInPimpinan) {
            return back()->with('error', 'Cannot delete Jabatan Pimpinan, it is still associated with some Pimpinan.');
        }
        $jabatan_pimpinan->delete();

        return to_route('jabatanpimpinan')->with('success', 'Jabatan Pimpinan deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:jabatan_pimpinans,id_jabatan_pimpinan',
        ]);

        $ids = $request->input('ids');

        $existingPimpinanCount =Pimpinan::whereIn('jabatan_pimpinan_id', $ids)->count();

        if ($existingPimpinanCount > 0) {
            return back()->with('error', 'Cannot delete Jabatan Pimpinan, it is still associated with some Pimpinan.');
        }

        JabatanPimpinan::whereIn('id_jabatan_pimpinan', $ids)->delete();

        return to_route('jabatanpimpinan')->with('success', 'Jabatan Pimpinan deleted successfully');
    }

    function getCariNomor()
    {
        $id_jabatan_pimpinan = JabatanPimpinan::pluck('id_jabatan_pimpinan')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_jabatan_pimpinan)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
