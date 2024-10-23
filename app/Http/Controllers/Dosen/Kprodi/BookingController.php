<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Mahasiswa;
use App\Models\Ruangan;
use App\Models\Sesi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_booking = Booking::with('r_sesi', 'r_ruangan', 'r_mahasiswa')->get();

        $ruangan = Ruangan::all();
        $sesi = Sesi::all();
        $mahasiswa = Mahasiswa::all();
        $nextNumber = $this->getCariNomor();
        return Inertia::render('main/kaprodi/booking/booking', [
            'data_booking' => $data_booking,
            'nextNumber' => $nextNumber,
            'ruanganOptions' => $ruangan->map(fn($p) => [
                'label' => $p->kode_ruangan,
                'value' => $p->id_ruangan
            ]),
            'mahasiswaOptions' => $mahasiswa->map(fn($p) => [
                'label' => $p->nama_mahasiswa,
                'value' => $p->id_mahasiswa
            ]),
            'sesiOptions' => $sesi->map(fn($u) => [
                'label' => $u->periode_sesi,
                'value' => $u->id_sesi
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
            'id_booking' => 'required',
            'ruangan_id' => 'required|exists:ruangan,id_ruangan',
            'sesi_id' => 'required|exists:sesi,id_sesi',
            'mahasiswa_id'=> 'required|exists:mahasiswas,id_mahasiswa',
            'tgl_booking' => 'required',
            'tipe' => 'required|string'
        ]);
        $validator->after(function ($validator) use ($request) {
            $exists = Booking::where('ruangan_id', $request->ruangan_id)
                ->where('sesi_id', $request->sesi_id)
                ->where('tgl_booking', $request->tgl_booking)
                ->exists();
            if ($exists) {
                $validator->errors()->add('ruangan_id', 'Kombinasi ruangan dan sesi sudah ada');
            }
        });
        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Booking::create([
                'id_booking' => $request->id_booking,
                'ruangan_id' => $request->ruangan_id,
                'sesi_id' => $request->sesi_id,
                'mahasiswa_id' => $request->mahasiswa_id,
                'tgl_booking' => $request->tgl_booking,
                'tipe' => $request->tipe
            ]);
            DB::commit();

            return to_route('booking')->with('success', 'Jadwal Ruangan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('booking')->with('error', 'Jadwal Ruangan created failed');
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
            'id_booking' => 'required',
            'ruangan_id' => 'required|exists:ruangan,id_ruangan',
            'sesi_id' => 'required|exists:sesi,id_sesi',
            'mahasiswa_id'=> 'required|exists:mahasiswas,id_mahasiswa',
            'tgl_booking' => 'required',
            'tipe' => 'required|string',
            'status_booking' => 'required|string'
        ]);
        $validator->after(function ($validator) use ($request) {
            $exists = Booking::where('ruangan_id', $request->ruangan_id)
                ->where('sesi_id', $request->sesi_id)
                ->where('tgl_booking', $request->tgl_booking)
                ->exists();
            if ($exists) {
                $validator->errors()->add('ruangan_id', 'Kombinasi ruangan dan sesi sudah ada');
            }
        });

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'id_booking' => $request->id_booking,
                'ruangan_id' => $request->ruangan_id,
                'sesi_id' => $request->sesi_id,
                'mahasiswa_id' => $request->mahasiswa_id,
                'tgl_booking' => $request->tgl_booking,
                'tipe' => $request->tipe,
                'status_booking' => $request->status_booking
            ];

            $rTersedia = Booking::findOrFail($id);
            $rTersedia->update($data);
            DB::commit();
            return to_route('booking')->with('success', 'Jadwal Ruangan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('booking')->with('error', 'Jadwal Ruangan updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking = Booking::findOrFail($booking->id_booking);
        $booking->delete();

        return to_route('booking')->with('success', 'Jadwal Ruangan deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:booking,id_booking',
        ]);
        $ids = $request->input('ids');
        Booking::whereIn('id_booking', $ids)->delete();

        return to_route('booking')->with('success', 'Jadwal Ruangan deleted successfully');
    }

    function getCariNomor()
    {
        $id_booking = Booking::pluck('id_booking')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_booking)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}