<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\log_book_pkl;
use App\Models\PklMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LaporanPklController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        // dd($id_dosen);
        $pkl_mhs_id = PklMhs::where('pembimbing_id', $id_dosen)->pluck('id_pkl_mhs')->toArray();
        // dd($pembimbing_id);
        $data_laporan = log_book_pkl::whereIn('pkl_mhs_id', $pkl_mhs_id)
        ->with('r_pkl_mhs.r_usulan.r_mahasiswa', 'r_pkl_mhs.r_usulan.r_roleTempatPkls.r_tempatPkls')->get();
        return Inertia::render('main/pembimbing/laporanpkl/laporanpkl', [
            'data_laporanpkl' => $data_laporan,
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status' => $request->status,
                'komentar' => $request->komentar,
            ];

            $laporanpkl = log_book_pkl::findOrFail($id);
            $laporanpkl->update($data);
            DB::commit();
            return to_route('laporanpkl')->with('success', 'Laporan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('laporanpkl')->with('error', 'Laporan Pkl updated failed');
        }
    }
}
