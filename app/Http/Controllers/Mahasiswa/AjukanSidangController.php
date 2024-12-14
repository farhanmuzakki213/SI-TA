<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Models\log_book_pkl;
use App\Models\Mahasiswa;
use App\Models\PklMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AjukanSidangController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $pklmhs = PklMhs::whereHas('r_usulan', function ($q) use ($id_mahasiswa) {
            $q->where('mahasiswa_id', $id_mahasiswa);
        })->with('r_pembimbing', 'r_penguji')->get();

        $log_book = log_book_pkl::where('pkl_mhs_id', $pklmhs[0]->id_pkl_mhs)->count();
        // dd($log_book);
        return Inertia::render('main/mahasiswa/ajukansidang/ajukansidang', [
            'total_log_book' => $log_book,
            'data_ajukansidang' => $pklmhs,
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'pembimbing_pkl' => 'required|string',
            'judul_laporan' => 'required|string',
            'nilai_industri' => 'required|string',
            'file_nilai' => 'required|file|mimes:pdf|max:10240',
            'file_laporan' => 'required|file|mimes:pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $oldData = PklMhs::where('id_pkl_mhs', $id)->first();

            if (!$oldData->file_laporan !== null && $request->hasFile('file_laporan')) {
                $oldFiles = json_decode($oldData->file_laporan, true) ?? [];
                foreach ($oldFiles as $oldFile) {
                    Storage::delete('public/uploads/pkl/laporan_akhir/' . $oldFile);
                }
            }

            if ($request->hasFile('file_laporan')) {
                foreach ($request->file('file_laporan') as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $path = 'public/uploads/pkl/laporan_akhir/';
                    $file->storeAs($path, $filename);
                    $uploadedFileLaporan = $filename;
                }
            }

            if (!$oldData->file_nilai !== null && $request->hasFile('file_nilai')) {
                $oldFiles = json_decode($oldData->file_nilai, true) ?? [];
                foreach ($oldFiles as $oldFile) {
                    Storage::delete('public/uploads/pkl/laporan_akhir/' . $oldFile);
                }
            }

            if ($request->hasFile('file_nilai')) {
                foreach ($request->file('file_nilai') as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $path = 'public/uploads/pkl/nilai_industri/';
                    $file->storeAs($path, $filename);
                    $uploadedFileNilai = $filename;
                }
            }

            $data = [
                'judul_laporan' => $request->judul_laporan,
                'pembimbing_pkl' => $request->pembimbing_pkl,
                'laporan_akhir' => $uploadedFileLaporan,
                'laporan_nilai' => $uploadedFileNilai,
            ];

            $oldData->update($data);
            DB::commit();
            return to_route('MhsPkl')->with('success', 'Pengajuan Sidang updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPkl')->with('error', 'Pengajuan Sidang updated failed');
        }
    }
}
