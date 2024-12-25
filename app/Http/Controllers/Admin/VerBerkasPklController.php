<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsPklResource;
use App\Models\PklMhs;
use App\Models\User;
use App\Notifications\PenugasanDosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class VerBerkasPklController extends Controller
{
    public function index()
    {
        $pkl_mhs = PklMhs::with('r_usulan.r_mahasiswa')->whereNotNull('judul_laporan')->get();
        return Inertia::render('main/admin/verberkaspkl/index', [
            'data_pkl_mhs' => MhsPklResource::collection($pkl_mhs),
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
            $pkl_mhs = PklMhs::findOrFail($id);
            // dd($pkl_mhs->toArray());
            $data = [
                'status_ver_pkl' => $request->status_ver_pkl,
            ];

            $pkl_mhs->update($data);
            DB::commit();
            return to_route('verberkaspkl')->with('success', 'Ver Sidang Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('verberkaspkl')->with('error', 'Ver Sidang Pkl updated failed');
        }
    }
}
