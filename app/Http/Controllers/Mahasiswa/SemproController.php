<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganSemproResource;
use App\Http\Resources\MhsPklResource;
use App\Http\Resources\MhsResource;
use App\Http\Resources\MhsSemproResource;
use App\Models\Mahasiswa;
use App\Models\PklMhs;
use App\Models\SemproBimbingan;
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
        $data_pkl = PklMhs::whereHas('r_usulan', function ($q) use ($id_mahasiswa) {
            $q->where('mahasiswa_id', $id_mahasiswa);
        })->get();
        // dd($data_sempro, $id_mahasiswa->toArray());
        return Inertia::render('main/mahasiswa/sempro/index', [
            'data_mahasiswa' => MhsResource::collection($mahasiswa),
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'data_pkl' => MhsPklResource::collection($data_pkl),
            'nextNumber' => CariNomor::getCariNomor(SemproMhs::class, 'id_sempro_mhs'),
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_sempro = SemproMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji',
            )
            ->where('id_sempro_mhs', $id)
            ->get();
        $id_sempro_mhs = $data_sempro->first()->id_sempro_mhs;
        $data_bimbingan_1 = SemproBimbingan::where('sempro_mhs_id', $id_sempro_mhs)->where('sebagai', 'pembimbing_1')->get();
        $data_bimbingan_2 = SemproBimbingan::where('sempro_mhs_id', $id_sempro_mhs)->where('sebagai', 'pembimbing_2')->get();
        $data_bimbingan = SemproBimbingan::where('sempro_mhs_id', $id_sempro_mhs)->get();
        // dd($data_sempro, $id_mahasiswa->toArray());
        return Inertia::render('main/mahasiswa/sempro/detail', [
            'data_bimbingan' => MhsBimbinganSemproResource::collection($data_bimbingan),
            'data_bimbingan_1' => MhsBimbinganSemproResource::collection($data_bimbingan_1),
            'data_bimbingan_2' => MhsBimbinganSemproResource::collection($data_bimbingan_2),
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'nextNumberBimbingan' => CariNomor::getCariNomor(SemproBimbingan::class, 'id_bimbingan_mhs'),
        ]);
    }

    public function storeBimbingan(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_bimbingan_mhs' => 'required',
            'sempro_mhs_id' => 'required|exists:sempro_mhs,id_sempro_mhs',
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'sebagai' => 'required|in:pembimbing_1,pembimbing_2',
            'pembahasan' => 'required',
            'file_bimbingan' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            if ($request->hasFile('file_bimbingan')) {
                $file = $request->file('file_bimbingan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/sempro/bimbingan/';
                $file->storeAs($path, $filename);
                SemproBimbingan::create([
                    'id_bimbingan_mhs' => $request->id_bimbingan_mhs,
                    'sempro_mhs_id' => $request->sempro_mhs_id,
                    'dosen_id' => $request->dosen_id,
                    'pembahasan' => $request->pembahasan,
                    'sebagai' => $request->sebagai,
                    'file_bimbingan' => $filename
                ]);
            }
            DB::commit();

            return back()->with('success', 'Bimbingan Sempro created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan Sempro created failed' . $e->getMessage());
        }
    }

    public function updateBimbingan(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'sebagai' => 'required|in:pembimbing_1,pembimbing_2',
            'pembahasan' => 'required',
            'file_bimbingan' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = SemproBimbingan::where('id_bimbingan_mhs', $id)->first();
            $filename = $request->file_bimbingan;
            if ($oldData->file_bimbingan !== $filename) {
                Storage::delete('public/uploads/sempro/bimbingan/' . $oldData->file_bimbingan);
                $file = $request->file('file_bimbingan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/sempro/bimbingan/';
                $file->storeAs($path, $filename);
            }
            $data = [
                'dosen_id' => $request->dosen_id,
                'sebagai' => $request->sebagai,
                'pembahasan' => $request->pembahasan,
                'file_bimbingan' => $filename
            ];
            // dd($data);
            $oldData->update($data);
            DB::commit();
            return back()->with('success', 'Bimbingan Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan Sempro updated failed');
        }
    }

    public function storeJudul(Request $request)
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

            return to_route('MhsSempro')->with('success', 'Pengajuan Judul Sempro created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsSempro')->with('error', 'Pengajuan Judul Sempro created failed' . $e->getMessage());
        }
    }

    public function updateJudul(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'judul_sempro' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = SemproMhs::where('id_sempro_mhs', $id)->first();
            $data = [
                'judul_sempro' => $request->judul_sempro,
            ];
            if ($oldData->status_judul_sempro === '4') {
                $data['status_judul_sempro'] = '2';
            }
            // dd($data);
            $oldData->update($data);
            DB::commit();
            return to_route('MhsSempro')->with('success', 'Pengajuan Judul Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsSempro')->with('error', 'Pengajuan Judul Sempro updated failed');
        }
    }

    public function updateFile(Request $request, string $id)
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
            $filename = $request->file_sempro ?? null;
            if ($oldData->file_sempro !== null && $oldData->file_sempro !== $filename) {
                Storage::delete('public/uploads/sempro/file/' . $oldData->file_sempro);
            }
            $data = [
                'judul_sempro' => $request->judul_sempro,
            ];
            if ($oldData->status_ver_sempro === '4' || $oldData->status_ver_sempro === '1') {
                $data['status_ver_sempro'] = '2';
            }
            if ($request->hasFile('file_sempro')) {
                $file = $request->file('file_sempro');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/sempro/file/';
                $file->storeAs($path, $filename);
                $data['file_sempro'] = $filename;
            }

            // dd($data);
            $oldData->update($data);
            DB::commit();
            return back()->with('success', 'Upload File Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Upload File Sempro updated failed');
        }
    }
}
