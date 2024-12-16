<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsResource;
use App\Http\Resources\MhsSemproResource;
use App\Models\Mahasiswa;
use App\Models\SemproMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SemproController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $mahasiswa = Mahasiswa::where('user_id', $id_user)->with('r_user', 'r_kelas.r_prodi.r_jurusan')->get();
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_sempro = SemproMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji',
            )
            ->get();

        // dd($data_sempro, $id_mahasiswa->toArray());
        return Inertia::render('main/mahasiswa/sempro/index', [
            'data_mahasiswa' => MhsResource::collection($mahasiswa),
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'nextNumber' => CariNomor::getCariNomor(SemproMhs::class, 'id_sempro_mhs'),
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_sempro_mhs' => 'required',
            'mahasiswa_id' => 'required|exists:mahasiswas,id_mahasiswa',
            'judul_sempro' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            SemproMhs::create([
                'id_sempro_mhs' => $request->id_sempro_mhs,
                'mahasiswa_id' => $request->mahasiswa_id,
                'judul_sempro' => $request->judul_sempro,
            ]);
            DB::commit();

            return to_route('MhsSempro')->with('success', 'Pengajuan Sempro created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsSempro')->with('error', 'Pengajuan Sempro created failed');
        }
    }

    public function update(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'judul_sempro' => 'required',
            'file_sempro' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = SemproMhs::where('id_sempro_mhs', $id)->first();
            if ($oldData->file_sempro !== null && $request->hasFile('file_sempro')) {
                Storage::delete('public/uploads/sempro/file/' . $oldData->file_sempro);
            }
            $filename = null;
            if ($request->hasFile('file_sempro')) {
                $file = $request->file('file_sempro');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/sempro/file/';
                $file->storeAs($path, $filename);
            }
            $data = [
                'judul_sempro' => $request->judul_sempro,
                'file_sempro' => $filename
            ];
            // dd($data);
            $oldData->update($data);
            DB::commit();
            return to_route('MhsSempro')->with('success', 'Pengajuan Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsSempro')->with('error', 'Pengajuan Sempro updated failed');
        }
    }
}
