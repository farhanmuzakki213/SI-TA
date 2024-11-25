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
            'judul' => 'required|string',
            'dokumen_pendukung.*' => 'required|file|mimes:pdf,doc,docx|max:40960',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $oldData = PklMhs::where('id_pkl_mhs', $id)->first();

            if (!$oldData->dokumen_pendukung !== null && $request->hasFile('dokumen_pendukung')) {
                $oldFiles = json_decode($oldData->dokumen_pendukung, true) ?? [];
                foreach ($oldFiles as $oldFile) {
                    Storage::delete('public/uploads/pkl/dokumen_pendukung_sidang/' . $oldFile);
                }
            }

            $uploadedFiles = [];
            if ($request->hasFile('dokumen_pendukung')) {
                foreach ($request->file('dokumen_pendukung') as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $path = 'public/uploads/pkl/dokumen_pendukung_sidang/';
                    $file->storeAs($path, $filename);
                    $uploadedFiles[] = $filename;
                }
            }
            $data = [
                'judul' => $request->judul,
                'pembimbing_pkl' => $request->pembimbing_pkl,
                'dokumen_pendukung' => json_encode($uploadedFiles),
            ];

            $oldData->update($data);
            DB::commit();
            return to_route('ajukansidang')->with('success', 'Pengajuan Sidang updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('ajukansidang')->with('error', 'Pengajuan Sidang updated failed');
        }
    }
}
