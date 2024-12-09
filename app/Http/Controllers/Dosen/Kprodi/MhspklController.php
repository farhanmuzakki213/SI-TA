<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Http\Resources\MhsPklResource;
use App\Http\Resources\MhsPklUsulanResource;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use App\Models\UsulanTempatPkl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MhspklController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->first()->prodi_id;
        $usulan = UsulanTempatPkl::with('r_mahasiswa.r_kelas.r_prodi', 'r_roleTempatPkls.r_tempatPkls')
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi);
            })
            ->get();
        return Inertia::render('main/kaprodi/mhspkl/index', [
            'data_usulanpkl' => MhsPklUsulanResource::collection($usulan),
            'dosenOptions' => Dosen::all()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
        ]);
    }

    public function detail($id)
    {
        $data_mhs = PklMhs::where('id_pkl_mhs', $id)
            ->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls', 'r_pembimbing', 'r_penguji')
            ->get();
        return Inertia::render('main/kaprodi/mhspkl/detail', [
            'data_mhs' => MhsPklResource::collection($data_mhs),
            'dosenOptions' => Dosen::all()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
        ]);
    }

    public function updateUsulan(Request $request, string $id)
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
            if ($request->status_usulan == '3') {
                $nextNumber = CariNomor::getCariNomor(PklMhs::class, 'id_pkl_mhs');
                $dataPkl = [
                    'id_pkl_mhs' => $nextNumber,
                    'pembimbing_id' => $request->pembimbing_id,
                    'penguji_id' => $request->penguji_id,
                    'usulan_tempat_pkl_id' => $request->id_usulan,
                ];
                PklMhs::create($dataPkl);
            }
            $data = [
                'status_usulan' => $request->status_usulan,
                'komentar' => $request->komentar,
            ];

            $usulanpkl = UsulanTempatPkl::findOrFail($id);
            $usulanpkl->update($data);
            DB::commit();
            return to_route('MhsPklKprodi')->with('success', 'Usulan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPklKprodi')->with('error', 'Usulan Pkl updated failed');
        }
    }

    public function updatePkl(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'pembimbing_id' => 'required|exists:dosens,id_dosen',
            'penguji_id' => 'required|exists:dosens,id_dosen',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'pembimbing_id' => $request->pembimbing_id,
                'penguji_id' => $request->penguji_id,
            ];

            $pkl = PklMhs::findOrFail($id);
            $pkl->update($data);
            DB::commit();
            return back()->with('success', 'Pembimbing dan Penguji Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Pembimbing dan Penguji Pkl updated failed');
        }
    }
}
