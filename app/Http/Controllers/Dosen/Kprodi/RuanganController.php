<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Models\Ruangan;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('main/kaprodi/ruangan/ruangan', [
            'nextNumber' => CariNomor::getCariNomor(Ruangan::class, 'id_ruangan'),
            'data_ruangan' => Ruangan::get(),
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
            'id_ruangan' => 'required',
            'kode_ruangan' => ['required', 'string', 'max:255', 'unique:' . Ruangan::class],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Ruangan::create([
                'id_ruangan' => $request->id_ruangan,
                'kode_ruangan' => $request->kode_ruangan,
            ]);
            DB::commit();

            return to_route('ruangan')->with('success', 'Ruangan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('ruangan')->with('error', 'Ruangan created failed');
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
            'kode_ruangan' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'kode_ruangan' => $request->kode_ruangan,
            ];

            $ruangan = Ruangan::findOrFail($id);
            $ruangan->update($data);
            DB::commit();
            return to_route('ruangan')->with('success', 'Ruangan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('ruangan')->with('error', 'Ruangan updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ruangan $ruangan)
    {
        // dd($ruangan->toArray());
        $ruangan = Ruangan::findOrFail($ruangan->id_ruangan);

        $existsInBooking = Booking::where('ruangan_id', $ruangan->id_ruangan)->exists();

        if ($existsInBooking) {
            return back()->with('error', 'Cannot delete ruangan, it is still associated with some table.');
        }
        $ruangan->delete();

        return to_route('ruangan')->with('success', 'Ruangan deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:ruangan,id_ruangan',
        ]);

        $ids = $request->input('ids');

        $existingBookingCount = Booking::whereIn('ruangan_id', $ids)->count();

        if ($existingBookingCount > 0) {
            return back()->with('error', 'Cannot delete ruangan, it is still associated with some table.');
        }

        Ruangan::whereIn('id_ruangan', $ids)->delete();

        return to_route('ruangan')->with('success', 'Ruangan deleted successfully');
    }
}
