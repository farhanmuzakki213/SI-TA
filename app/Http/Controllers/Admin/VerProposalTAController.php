<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsTaResource;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class VerProposalTAController extends Controller
{
    public function index()
    {
        $ta_mhs = TaMhs::with([
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
        ])
            ->where('status_judul', '2')
            ->whereHas('r_mahasiswa.r_kelas.r_prodi', function ($query) {
                $query->where('jenjang', 'D3');
            })
            ->whereNotNull('file_proposal')
            ->get();
            // dd($ta_mhs);
        return Inertia::render('main/admin/verproposalta/index', [
            'data_ta' => MhsTaResource::collection($ta_mhs),
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_ver_proposal' => 'required',
            'komentar_proposal' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status_ver_proposal' => $request->status_ver_proposal,
                'komentar_proposal' => $request->komentar_proposal,
            ];
            // dd($data);
            $ta = TaMhs::findOrFail($id);
            $ta->update($data);
            DB::commit();
            return to_route('verproposalta')->with('success', 'Verifikasi Proposal TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('verproposalta')->with('error', 'Verifikasi Proposal TA updated failed');
        }
    }
}
