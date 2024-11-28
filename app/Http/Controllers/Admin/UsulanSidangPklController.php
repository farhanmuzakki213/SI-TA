<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PklMhs;
use App\Models\User;
use App\Notifications\PenugasanDosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
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
            $pkl_mhs = PklMhs::with('r_usulan.r_mahasiswa', 'r_pembimbing', 'r_penguji')->findOrFail($id);
            // dd($pkl_mhs->toArray());
            $data = [
                'status_ver_pkl' => $request->status_ver_pkl,
            ];
            if ($request->status_ver_pkl == 3) {
                $data_pembimbing = User::where('id', $pkl_mhs->r_pembimbing->user_id)->first();
                $data_penguji = User::where('id', $pkl_mhs->r_penguji->user_id)->first();

                if($data_pembimbing && $data_penguji){
                    Notification::send($data_pembimbing, new PenugasanDosen($pkl_mhs));
                    Notification::send($data_penguji, new PenugasanDosen($pkl_mhs));
                }
            }

            $pkl_mhs->update($data);
            DB::commit();
            return to_route('usulansidangpkl')->with('success', 'Ver Sidang Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('usulansidangpkl')->with('error', 'Ver Sidang Pkl updated failed');
        }
    }
}
