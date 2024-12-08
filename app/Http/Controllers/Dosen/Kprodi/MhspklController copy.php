<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use App\Models\PklNilai;
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
        $pklmhs = PklMhs::with('r_usulan.r_roleTempatPkls.r_tempatPkls', 'r_usulan.r_mahasiswa', 'r_usulan.r_mahasiswa.r_kelas',  'r_pembimbing', 'r_penguji')
        ->whereHas('r_usulan.r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
            $query->where('prodi_id', $kaprodi);
        })->get();
        return Inertia::render('main/kaprodi/mhspkl/mhspkl', [
            'nextNumber' => CariNomor::getCariNomor(PklMhs::class, 'id_pkl_mhs'),
            'data_mhspkl' => $pklmhs,
            'usulanOptions' => BaseOptionsResource::collection(
                UsulanTempatPkl::with('r_mahasiswa')->where('status_usulan', '3')->get()->map(function ($p) {
                    $p->nama_mahasiswa = $p->r_mahasiswa->nama_mahasiswa ?? 'Nama tidak tersedia';
                    return $p;
                })->map(function ($p) {
                    return new BaseOptionsResource($p, 'nama_mahasiswa', 'id_usulan');
                })
            ),

            'dosenOptions' => BaseOptionsResource::collection(Dosen::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'nama_dosen', 'id_dosen');
            })),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_pkl_mhs' => 'required',
            'pembimbing_id' => 'required|exists:dosens,id_dosen',
            'penguji_id' => 'required|exists:dosens,id_dosen',
            'usulan_tempat_pkl_id' => 'required|exists:usulan_tempat_pkls,id_usulan|unique:' . PklMhs::class . ',usulan_tempat_pkl_id',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            PklMhs::create([
                'id_pkl_mhs' => $request->id_pkl_mhs,
                'pembimbing_id' => $request->pembimbing_id,
                'penguji_id' => $request->penguji_id,
                'usulan_tempat_pkl_id' => $request->usulan_tempat_pkl_id,
            ]);
            DB::commit();

            return to_route('mhspkl')->with('success', 'Mahasiswa PKL created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('mhspkl')->with('error', 'Mahasiswa PKL created failed controller');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'pembimbing_id' => 'required|exists:dosens,id_dosen',
            'penguji_id' => 'required|exists:dosens,id_dosen',
            'usulan_tempat_pkl_id' => 'required|exists:usulan_tempat_pkls,id_usulan',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'pembimbing_id' => $request->pembimbing_id,
                'penguji_id' => $request->penguji_id,
                'usulan_tempat_pkl_id' => $request->usulan_tempat_pkl_id,
            ];

            $mhspkl = PklMhs::findOrFail($id);
            $mhspkl->update($data);
            DB::commit();
            return to_route('mhspkl')->with('success', 'Mahasiswa PKL updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('mhspkl')->with('error', 'Mahasiswa PKL updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PklMhs $mhspkl)
    {
        // dd($mhspkl->toArray());
        $mhspkl = PklMhs::findOrFail($mhspkl->id_pkl_mhs);

        $existsInPklNilai = PklNilai::where('pkl_mhs_id', $mhspkl->id_pkl_mhs)->exists();

        if ($existsInPklNilai) {
            return back()->with('error', 'Cannot delete Mahasiswa PKL, it is still associated with some table.');
        }
        $mhspkl->delete();

        return to_route('mhspkl')->with('success', 'Mahasiswa PKL deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:pkl_mhs,id_pkl_mhs',
        ]);

        $ids = $request->input('ids');

        $existingPklNilaiCount = PklNilai::whereIn('pkl_mhs_id', $ids)->count();

        if ($existingPklNilaiCount > 0) {
            return back()->with('error', 'Cannot delete Mahasiswa PKL, it is still associated with some table.');
        }

        PklMhs::whereIn('id_pkl_mhs', $ids)->delete();

        return to_route('mhspkl')->with('success', 'Mahasiswa PKL deleted successfully');
    }
}
