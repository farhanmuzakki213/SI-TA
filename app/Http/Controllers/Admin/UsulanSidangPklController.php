<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PklMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UsulanSidangPklController extends Controller
{
    public function index()
    {
        return Inertia::render('main/admin/usulansidangpkl/usulansidangpkl', [
            'data_pkl_mhs' => PklMhs::with('r_usulan.r_mahasiswa')->whereNotNull('judul')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'status_ver_pkl' => 'required|in:1,3',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status_ver_pkl' => $request->status_ver_pkl,
            ];

            $pkl_mhs = PklMhs::findOrFail($id);
            $pkl_mhs->update($data);
            DB::commit();
            return to_route('usulansidangpkl')->with('success', 'Ver Sidang Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('usulansidangpkl')->with('error', 'Ver Sidang Pkl updated failed');
        }
    }
}
