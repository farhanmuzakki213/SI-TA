<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\JabatanPimpinan;
use App\Models\PimpinanJurusan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PimpinanJurusanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_pimpinan_jurusan = PimpinanJurusan::with('r_dosen.r_prodi.r_jurusan', 'r_jabatan_pimpinan')->orderBy('id_pimpinan_jurusan')->get();

        $dosen = Dosen::with('r_prodi.r_jurusan')->get();
        $jabatan_pimpinan = JabatanPimpinan::all();
        $nextNumber = $this->getCariNomor();
        // dd($data_pimpinan_jurusan->toArray(), $dosen->toArray(), $jabatan_pimpinan->toArray());
        return Inertia::render('main/admin/pimpinanjurusan/pimpinanj', [
            'data_pimpinan_jurusan' => $data_pimpinan_jurusan,
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
            'id_pimpinan_jurusan' => 'required',
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'jabatan_pimpinan_id' => 'required|exists:jabatan_pimpinans,id_jabatan_pimpinan',
            'periode' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $status_pimpinan_jurusan = "1";

        DB::beginTransaction();
        try {
            PimpinanJurusan::create([
                'id_pimpinan_jurusan' => $request->id_pimpinan_jurusan,
                'dosen_id' => $request->dosen_id,
                'jabatan_pimpinan_id' => $request->jabatan_pimpinan_id,
                'periode' => $request->periode,
                'status_pimpinan_jurusan' => $status_pimpinan_jurusan,
            ]);
            DB::commit();

            return to_route('pimpinanjurusan')->with('success', 'Pimpinan Jurusan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('pimpinanjurusan')->with('error', 'Pimpinan Jurusan created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PimpinanJurusan $pimpinanJurusan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PimpinanJurusan $pimpinanJurusan)
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
            'id_pimpinan_jurusan' => 'required',
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'jabatan_pimpinan_id' => 'required|exists:jabatan_pimpinans,id_jabatan_pimpinan',
            'periode' => 'required|string',
            'status_pimpinan_jurusan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        // dd($request->nim_mahasiswa);
        DB::beginTransaction();
        try {
            $data = [
                'id_pimpinan_jurusan' => $request->id_pimpinan_jurusan,
                'dosen_id' => $request->dosen_id,
                'jabatan_pimpinan_id' => $request->jabatan_pimpinan_id,
                'periode' => $request->periode,
                'status_pimpinan_jurusan' => $request->status_pimpinan_jurusan,
            ];

            $pimpinanJurusan = PimpinanJurusan::findOrFail($id);
            $pimpinanJurusan->update($data);
            DB::commit();
            return to_route('pimpinanjurusan')->with('success', 'Pimpinan Jurusan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('pimpinanjurusan')->with('error', 'Pimpinan Jurusan updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PimpinanJurusan $pimpinan_jurusan)
    {
        $pimpinan_jurusan->delete();

        return to_route('pimpinanjurusan')->with('success', 'Pimpinan Jurusan deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:pimpinan_jurusans,id_pimpinan_jurusan',
        ]);
        $ids = $request->input('ids');
        PimpinanJurusan::whereIn('id_pimpinan_jurusan', $ids)->delete();

        return to_route('pimpinanjurusan')->with('success', 'Pimpinan Jurusan deleted successfully');
    }

    function getCariNomor()
    {
        $id_pimpinan_jurusan = PimpinanJurusan::pluck('id_pimpinan_jurusan')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_pimpinan_jurusan)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
