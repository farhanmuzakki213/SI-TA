<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RuanganTersedia;
use App\Models\Sesi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SesiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_sesi = Sesi::get();
        $nextNumber = $this->getCariNomor();
        return Inertia::render('main/admin/sesi/sesi', [
            'nextNumber' => $nextNumber,
            'data_sesi' => $data_sesi
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
            'id_sesi' => 'required',
            'periode_sesi' => ['required', 'string', 'max:255', 'unique:' . Sesi::class],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Sesi::create([
                'id_sesi' => $request->id_sesi,
                'periode_sesi' => $request->periode_sesi,
            ]);
            DB::commit();

            return to_route('sesi')->with('success', 'Sesi created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('sesi')->with('error', 'Sesi created failed controller');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'periode_sesi' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'periode_sesi' => $request->periode_sesi,
            ];

            $sesi = Sesi::findOrFail($id);
            $sesi->update($data);
            DB::commit();
            return to_route('sesi')->with('success', 'Sesi updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('sesi')->with('error', 'Sesi updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sesi $sesi)
    {
        // dd($sesi->toArray());
        $sesi = Sesi::findOrFail($sesi->id_sesi);

        $existsInRuangantersedia = RuanganTersedia::where('sesi_id', $sesi->id_sesi)->exists();

        if ($existsInRuangantersedia) {
            return back()->with('error', 'Cannot delete sesi, it is still associated with some table.');
        }
        $sesi->delete();

        return to_route('sesi')->with('success', 'Sesi deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:sesi,id_sesi',
        ]);

        $ids = $request->input('ids');

        $existingRuangantersediaCount = RuanganTersedia::whereIn('sesi_id', $ids)->count();

        if ($existingRuangantersediaCount > 0) {
            return back()->with('error', 'Cannot delete sesi, it is still associated with some table.');
        }

        Sesi::whereIn('id_sesi', $ids)->delete();

        return to_route('sesi')->with('success', 'Sesi deleted successfully');
    }

    function getCariNomor()
    {
        $id_sesi = Sesi::pluck('id_sesi')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_sesi)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
