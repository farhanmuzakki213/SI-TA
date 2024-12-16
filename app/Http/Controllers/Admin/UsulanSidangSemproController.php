<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsSemproResource;
use App\Models\SemproMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UsulanSidangSemproController extends Controller
{
    public function index()
    {
        $semro_mhs = SemproMhs::with('r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',)->where('status_judul_sempro', '3')->get();
        return Inertia::render('main/admin/usulansidangsempro/index', [
            'data_sempro' => MhsSemproResource::collection($semro_mhs),
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_ver_sempro' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status_ver_sempro' => $request->status_ver_sempro,
                'komentar' => $request->komentar,
            ];
            $sempro = SemproMhs::findOrFail($id);
            $sempro->update($data);
            DB::commit();
            return to_route('usulansidangsempro')->with('success', 'Verifikasi Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('usulansidangsempro')->with('error', 'Verifikasi Sempro updated failed');
        }
    }
}
