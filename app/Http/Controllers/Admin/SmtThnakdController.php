<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Smt_thnakd;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SmtThnakdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_smt_thnakd = Smt_thnakd::get();
        $nextNumber = $this->getCariNomor();
        // dd($data_smt_thnakd->toArray());
        return Inertia::render('main/admin/smt_thnakd/smt', [
            'nextNumber' => $nextNumber,
            'data_smt_thnakd' => $data_smt_thnakd
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
            'id_smt_thnakd' => 'required',
            'nama_smt_thnakd' => ['required', 'string', 'max:255', 'unique:' . Smt_thnakd::class],
            'kode_smt_thnakd' => ['required', 'string', 'max:255', 'unique:' . Smt_thnakd::class],
            'status_smt_thnakd' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Smt_thnakd::create([
                'id_smt_thnakd' => $request->id_smt_thnakd,
                'kode_smt_thnakd' => $request->kode_smt_thnakd,
                'nama_smt_thnakd' => $request->nama_smt_thnakd,
                'status_smt_thnakd' => $request->status_smt_thnakd,
            ]);
            DB::commit();

            return to_route('semester')->with('success', 'Semester dan Tahun Akademik created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('semester')->with('error', 'Semester dan Tahun Akademik created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Smt_thnakd $smt_thnakd)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Smt_thnakd $smt_thnakd)
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
            'nama_smt_thnakd' => ['required', 'string', 'max:255'],
            'kode_smt_thnakd' => ['required', 'string', 'max:255'],
            'status_smt_thnakd' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'kode_smt_thnakd' => $request->kode_smt_thnakd,
                'nama_smt_thnakd' => $request->nama_smt_thnakd,
                'status_smt_thnakd' => $request->status_smt_thnakd,
            ];

            $smt_thnakd = Smt_thnakd::findOrFail($id);
            $smt_thnakd->update($data);
            DB::commit();
            return to_route('semester')->with('success', 'Semester dan Tahun Akademik updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('semester')->with('error', 'Semester dan Tahun Akademik updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Smt_thnakd $smt_thnakd)
    {
        // dd($smt_thnakd->toArray());
        $smt_thnakd = Smt_thnakd::findOrFail($smt_thnakd->id_smt_thnakd);

        $existsInKelas = Kelas::where('smt_thnakd_id', $smt_thnakd->id_smt_thnakd)->exists();

        if ($existsInKelas) {
            return back()->with('error', 'Cannot delete semester, it is still associated with some kelas.');
        }
        $smt_thnakd->delete();

        return to_route('semester')->with('success', 'Semester deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:smt_thnakds,id_smt_thnakd',
        ]);

        $ids = $request->input('ids');

        $existingKelasCount = Kelas::whereIn('smt_thnakd_id', $ids)->count();

        if ($existingKelasCount > 0) {
            return back()->with('error', 'Cannot delete semester, it is still associated with some kelas.');
        }

        Smt_thnakd::whereIn('id_smt_thnakd', $ids)->delete();

        return to_route('semester')->with('success', 'Semester deleted successfully');
    }

    function getCariNomor()
    {
        $id_smt_thnakd = Smt_thnakd::pluck('id_smt_thnakd')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_smt_thnakd)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
