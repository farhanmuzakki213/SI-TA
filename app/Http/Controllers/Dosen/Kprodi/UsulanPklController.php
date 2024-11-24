<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\UsulanTempatPkl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UsulanPklController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->first()->prodi_id;
        $usulan = UsulanTempatPkl::with('r_mahasiswa', 'r_roleTempatPkls.r_tempatPkls')
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi);
            })
            ->get();
            // dd($kaprodi, $usulan);
        return Inertia::render('main/kaprodi/usulanpkl/usulanpkl', [
            'data_usulanpkl' => $usulan,
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_usulan' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'status_usulan' => $request->status_usulan,
                'komentar' => $request->komentar,
            ];

            $usulanpkl = UsulanTempatPkl::findOrFail($id);
            $usulanpkl->update($data);
            DB::commit();
            return to_route('usulanpkl')->with('success', 'Usulan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('usulanpkl')->with('error', 'Usulan Pkl updated failed');
        }
    }
}
