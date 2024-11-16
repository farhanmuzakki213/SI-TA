<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Models\log_book_pkl;
use App\Models\Mahasiswa;
use App\Models\PklMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LogBookMhsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('main/mahasiswa/laporanpkl/laporanpkl', [
            'nextNumber' => CariNomor::getCariNomor(log_book_pkl::class, 'id_log_book_pkl'),
            'data_laporanpkl' => log_book_pkl::with('r_pkl_mhs.r_usulan.r_mahasiswa')->get(),
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
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $pkl_mhs_id = PklMhs::whereHas('r_usulan', function ($q) use ($id_mahasiswa) {
            $q->where('mahasiswa_id', $id_mahasiswa);
        })->first()->id_pkl_mhs;
        // dd($id_mahasiswa, $pkl_mhs_id);
        $validator = Validator::make($request->all(), [
            'id_log_book_pkl' => 'required',
            'tgl_awal_kegiatan' => 'required|date',
            'tgl_akhir_kegiatan' => 'required|date|after_or_equal:tgl_awal_kegiatan',
            'dokumen_laporan' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            if ($request->hasFile('dokumen_laporan')) {
                $file = $request->file('dokumen_laporan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/pkl/laporan/';
                $file->storeAs($path, $filename);
                log_book_pkl::create([
                    'id_log_book_pkl' => $request->id_log_book_pkl,
                    'pkl_mhs_id' => $pkl_mhs_id,
                    'tgl_awal_kegiatan' => $request->tgl_awal_kegiatan,
                    'tgl_akhir_kegiatan' => $request->tgl_akhir_kegiatan,
                    'dokumen_laporan' => $filename
                ]);
            }
            DB::commit();

            return to_route('logbookmhs')->with('success', 'Laporan Pkl created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('logbookmhs')->with('error', 'Laporan Pkl created failed');
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
        dd($request->all());
        $validator = Validator::make($request->all(), [
            'tgl_awal_kegiatan' => 'required|date',
            'tgl_akhir_kegiatan' => 'required|date|after_or_equal:tgl_awal_kegiatan',
            'dokumen_laporan' => 'sometimes|required|mimes:pdf'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = log_book_pkl::where('id_look_book_pkl', $id)->first();
            if ($oldData->file !== null && $request->hasFile('upload_file')) {
                Storage::delete('public/uploads/pkl/laporan/' . $oldData->file);
            }
            $filename = null;
            if ($request->hasFile('dokumen_laporan')) {
                $file = $request->file('dokumen_laporan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/pkl/laporan/';
                $file->storeAs($path, $filename);
                $data['file'] = $filename;
            }
            $data = [
                'tgl_awal_kegiatan' => $request->tgl_awal_kegiatan,
                'tgl_akhir_kegiatan' => $request->tgl_akhir_kegiatan
            ];


            $laporan = log_book_pkl::findOrFail($id);
            $laporan->update($data);
            DB::commit();
            return to_route('logbookmhs')->with('success', 'Laporan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('logbookmhs')->with('error', 'Laporan Pkl updated failed');
        }
    }

    public function destroy(log_book_pkl $laporanpkl)
    {
        if ($laporanpkl && $laporanpkl->dokumen_laporan) {
            Storage::delete('public/uploads/pkl/laporan/' . $laporanpkl->dokumen_laporan);
        }
        $laporanpkl->delete();

        return to_route('logbookmhs')->with('success', 'Laporan Pkl deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:log_book_pkls,id_log_book_pkl',
        ]);
        $logBooks = log_book_pkl::whereIn('id_log_book_pkl', $request->input('ids'))->get();
        foreach ($logBooks as $laporanpkl) {
            if ($laporanpkl && $laporanpkl->dokumen_laporan) {
                Storage::delete('public/uploads/pkl/laporan/' . $laporanpkl->dokumen_laporan);
            }
        }

        $ids = $request->input('ids');

        log_book_pkl::whereIn('id_log_book_pkl', $ids)->delete();

        return to_route('logbookmhs')->with('success', 'Laporan Pkl deleted successfully');
    }
}
