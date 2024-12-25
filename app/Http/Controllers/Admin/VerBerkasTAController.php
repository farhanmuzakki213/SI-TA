<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsTaResource;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class VerBerkasTAController extends Controller
{
    public function index()
    {
        $ta_mhs = TaMhs::with('r_mahasiswa.r_kelas.r_prodi.r_jurusan', 'r_mahasiswa.r_user')
            ->where('acc_pembimbing_satu', '1')
            ->where('acc_pembimbing_dua', '1')
            ->whereNotNull('file_ta')
            ->whereNotNull('file_laporan')
            ->whereNotNull('file_proposal')
            ->get();
        return Inertia::render('main/admin/verberkasta/index', [
            'data_ta' => MhsTaResource::collection($ta_mhs),
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_ver_ta' => 'required',
            'komentar_ta' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status_ver_ta' => $request->status_ver_ta,
                'komentar_ta' => $request->komentar_ta,
            ];
            // dd($data);
            $ta = TaMhs::findOrFail($id);
            $ta->update($data);
            DB::commit();
            return to_route('verberkasta')->with('success', 'Verifikasi Ta updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('verberkasta')->with('error', 'Verifikasi Ta updated failed');
        }
    }
}
