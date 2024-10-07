<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\JabatanPimpinan;
use App\Models\Pimpinan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PimpinanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_pimpinan = Pimpinan::with('r_dosen.r_prodi.r_jurusan', 'r_jabatan_pimpinan')->orderBy('id_pimpinan')->get();

        $dosen = Dosen::with('r_prodi.r_jurusan')->get();
        $jabatan_pimpinan = JabatanPimpinan::all();
        $nextNumber = $this->getCariNomor();
        // dd($data_pimpinan->toArray(), $dosen->toArray(), $jabatan_pimpinan->toArray());
        return Inertia::render('main/admin/pimpinan/pimpinan', [
            'data_pimpinan' => $data_pimpinan,
            'nextNumber' => $nextNumber,
            'dosenOptions' => $dosen->map(fn($p) => [
                'label' => $p->nama_dosen,
                'value' => $p->id_dosen
            ]),
            'jabatan_pimpinanOptions' => $jabatan_pimpinan->map(fn($u) => [
                'label' => $u->nama_jabatan_pimpinan,
                'value' => $u->id_jabatan_pimpinan
            ])
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
            'id_pimpinan' => 'required',
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'jabatan_pimpinan_id' => 'required|exists:jabatan_pimpinans,id_jabatan_pimpinan',
            'periode' => 'required|string',
        ]);

        $validator->after(function ($validator) use ($request) {
            if (($request->jabatan_pimpinan_id == 1 || $request->jabatan_pimpinan_id == 2) && $request->status_pimpinan == '1') {
                $existingJabatan = Pimpinan::where('jabatan_pimpinan_id', $request->jabatan_pimpinan_id)->where('status_pimpinan', '1')->first();
                if ($existingJabatan) {
                    $validator->errors()->add('jabatan_pimpinan_id', 'Jabatan sudah diisi oleh dosen lain');
                }
            }
            $prodi = Dosen::where('id_dosen', $request->dosen_id)->pluck('prodi_id')->toArray();
            if ($request->jabatan_pimpinan_id == 3 && $request->status_pimpinan == '1') {
                $existingJabatanProdi = Pimpinan::with('r_dosen.r_prodi')
                    ->whereHas('r_dosen', function ($query) use ($prodi) {
                        $query->where('prodi_id', $prodi);
                    })
                    ->where('jabatan_pimpinan_id', $request->jabatan_pimpinan_id)
                    ->where('status_pimpinan', '1')
                    ->get()
                    ->pluck('r_dosen.r_prodi.nama_prodi')
                    ->toArray();
                if ($existingJabatanProdi) {
                    $validator->errors()->add('jabatan_pimpinan_id', 'Jabatan Koordinator sudah diisi oleh dosen lain');
                }
            }
        });

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $status_pimpinan = "1";

        DB::beginTransaction();
        try {
            Pimpinan::create([
                'id_pimpinan' => $request->id_pimpinan,
                'dosen_id' => $request->dosen_id,
                'jabatan_pimpinan_id' => $request->jabatan_pimpinan_id,
                'periode' => $request->periode,
                'status_pimpinan' => $status_pimpinan,
            ]);
            DB::commit();

            return to_route('pimpinan')->with('success', 'Pimpinan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('pimpinan')->with('error', 'Pimpinan created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pimpinan $pimpinan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pimpinan $pimpinan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_pimpinan' => 'required',
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'jabatan_pimpinan_id' => 'required|exists:jabatan_pimpinans,id_jabatan_pimpinan',
            'periode' => 'required|string',
            'status_pimpinan' => 'required|string',
        ]);

        $validator->after(function ($validator) use ($request) {
            if (($request->jabatan_pimpinan_id == 1 || $request->jabatan_pimpinan_id == 2) && $request->status_pimpinan == '1') {
                $existingJabatan = Pimpinan::where('jabatan_pimpinan_id', $request->jabatan_pimpinan_id)->where('status_pimpinan', '1')->first();
                if ($existingJabatan) {
                    $validator->errors()->add('jabatan_pimpinan_id', 'Jabatan sudah diisi oleh dosen lain');
                }
            }
            $prodi = Dosen::where('id_dosen', $request->dosen_id)->pluck('prodi_id')->toArray();
            if ($request->jabatan_pimpinan_id == 3 && $request->status_pimpinan == '1') {
                $existingJabatanProdi = Pimpinan::with('r_dosen.r_prodi')
                    ->whereHas('r_dosen', function ($query) use ($prodi) {
                        $query->where('prodi_id', $prodi);
                    })
                    ->where('jabatan_pimpinan_id', $request->jabatan_pimpinan_id)
                    ->where('status_pimpinan', '1')
                    ->get()
                    ->pluck('r_dosen.r_prodi.nama_prodi')
                    ->toArray();
                if ($existingJabatanProdi) {
                    $validator->errors()->add('jabatan_pimpinan_id', 'Jabatan Koordinator sudah diisi oleh dosen lain');
                }
            }
        });

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        // dd($request->nim_mahasiswa);
        DB::beginTransaction();
        try {
            $data = [
                'id_pimpinan' => $request->id_pimpinan,
                'dosen_id' => $request->dosen_id,
                'jabatan_pimpinan_id' => $request->jabatan_pimpinan_id,
                'periode' => $request->periode,
                'status_pimpinan' => $request->status_pimpinan,
            ];

            $pimpinan = Pimpinan::findOrFail($id);
            $pimpinan->update($data);
            DB::commit();
            return to_route('pimpinan')->with('success', 'Pimpinan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('pimpinan')->with('error', 'Pimpinan updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pimpinan $pimpinan)
    {
        $pimpinan->delete();

        return to_route('pimpinan')->with('success', 'Pimpinan deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:pimpinans,id_pimpinan',
        ]);
        $ids = $request->input('ids');
        Pimpinan::whereIn('id_pimpinan', $ids)->delete();

        return to_route('pimpinan')->with('success', 'Pimpinan deleted successfully');
    }

    function getCariNomor()
    {
        $id_pimpinan = Pimpinan::pluck('id_pimpinan')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_pimpinan)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
