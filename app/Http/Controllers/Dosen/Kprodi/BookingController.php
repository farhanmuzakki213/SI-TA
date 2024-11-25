<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\Pimpinan;
use App\Models\PklMhs;
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
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->first()->prodi_id;
        $pklmhs = PklMhs::where('status_ver_pkl', '3')->whereHas('r_usulan.r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
            $query->where('prodi_id', $kaprodi);
        })->get();
        // dd($pklmhs);
        $mahasiswaPklOptions = $pklmhs->map(function ($p) {
            return [
                'label' => $p->r_usulan->r_mahasiswa->nama_mahasiswa ?? 'Unknown',
                'value' => $p->r_usulan->r_mahasiswa->id_mahasiswa ?? null,
            ];
        });
        // Contoh penanganan Jadwal Data Sempro
        $sempro = Mahasiswa::whereHas('r_kelas', function ($query) use ($kaprodi) {
            $query->where('prodi_id', $kaprodi);
        })->get();

        $mahasiswaSemproOptions = $sempro->map(function ($p) {
            return [
                'label' => $p->nama_mahasiswa ?? 'Unknown',
                'value' => $p->id_mahasiswa ?? null,
            ];
        });
        // Contoh penanganan Jadwal Data TA
        $ta = Mahasiswa::whereHas('r_kelas', function ($query) use ($kaprodi) {
            $query->where('prodi_id', $kaprodi);
        })->get();

        $mahasiswaTaOptions = $ta->map(function ($p) {
            return [
                'label' => $p->nama_mahasiswa ?? 'Unknown',
                'value' => $p->id_mahasiswa ?? null,
            ];
        });
        // dd($mahasiswaSemproOptions->toArray(), $mahasiswaTaOptions->toArray());
        return Inertia::render('main/kaprodi/booking/booking', [
            'data_booking' => Booking::with('r_sesi', 'r_ruangan', 'r_mahasiswa')->get(),
            'nextNumber' => CariNomor::getCariNomor(Booking::class, 'id_booking'),
            'ruanganOptions' => BaseOptionsResource::collection(Ruangan::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'kode_ruangan', 'id_ruangan');
            })),
            'sesiOptions' => BaseOptionsResource::collection(Sesi::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'periode_sesi', 'id_sesi');
            })),
            'mahasiswaPklOptions' => $mahasiswaPklOptions,
            'mahasiswaSemproOptions' => $mahasiswaSemproOptions,
            'mahasiswaTaOptions' => $mahasiswaTaOptions,
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
}
