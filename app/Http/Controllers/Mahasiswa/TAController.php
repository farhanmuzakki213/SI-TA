<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsPklResource;
use App\Http\Resources\MhsResource;
use App\Http\Resources\MhsSemproResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Mahasiswa;
use App\Models\PklMhs;
use App\Models\SemproMhs;
use App\Models\TaBimbingan;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TAController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $mahasiswa = Mahasiswa::where('user_id', $id_user)->with('r_user', 'r_kelas.r_prodi.r_jurusan')->get();
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_ta = TaMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji_1',
                'r_penguji_2',
                'r_sekretaris',
                'r_ketua',
            )
            ->get();
        $data_sempro = SemproMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji',
            )
            ->where('status_sempro', '3')
            ->get();
        $data_pkl = PklMhs::whereHas('r_usulan', function ($q) use ($id_mahasiswa) {
            $q->where('mahasiswa_id', $id_mahasiswa);
        })->get();
        // dd($data_ta, $data_sempro->toArray());
        return Inertia::render('main/mahasiswa/ta/index', [
            'data_mahasiswa' => MhsResource::collection($mahasiswa),
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'data_pkl' => MhsPklResource::collection($data_pkl),
            'nextNumber' => CariNomor::getCariNomor(TaMhs::class, 'id_ta_mhs'),
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $mahasiswa = Mahasiswa::where('user_id', $id_user)->with('r_user', 'r_kelas.r_prodi.r_jurusan')->get();
        $id_mahasiswa = Mahasiswa::where('user_id', $id_user)->first()->id_mahasiswa;
        $data_ta = TaMhs::where('mahasiswa_id', $id_mahasiswa)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji_1',
                'r_penguji_2',
                'r_sekretaris',
                'r_ketua',
            )
            ->get();

        $id_ta_mhs = $data_ta->first()->id_ta_mhs;
        $data_bimbingan_1 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_1')->get();
        $data_bimbingan_2 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_2')->get();
        $data_bimbingan = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->get();
        // dd($data_ta, $data_sempro->toArray());
        return Inertia::render('main/mahasiswa/ta/detail', [
            'data_mahasiswa' => MhsResource::collection($mahasiswa),
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_bimbingan' => MhsBimbinganTAResource::collection($data_bimbingan),
            'data_bimbingan_1' => MhsBimbinganTAResource::collection($data_bimbingan_1),
            'data_bimbingan_2' => MhsBimbinganTAResource::collection($data_bimbingan_2),
            'nextNumberBimbingan' => CariNomor::getCariNomor(TaBimbingan::class, 'id_bimbingan_mhs'),
        ]);
    }

    public function storeBimbingan(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_bimbingan_mhs' => 'required',
            'ta_mhs_id' => 'required|exists:ta_mhs,id_ta_mhs',
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
                $path = 'public/uploads/ta/bimbingan/';
                $file->storeAs($path, $filename);
                TaBimbingan::create([
                    'id_bimbingan_mhs' => $request->id_bimbingan_mhs,
                    'ta_mhs_id' => $request->ta_mhs_id,
                    'dosen_id' => $request->dosen_id,
                    'pembahasan' => $request->pembahasan,
                    'sebagai' => $request->sebagai,
                    'file_bimbingan' => $filename
                ]);
            }
            DB::commit();

            return back()->with('success', 'Bimbingan TA created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan TA created failed' . $e->getMessage());
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
            $oldData = TaBimbingan::where('id_bimbingan_mhs', $id)->first();
            $filename = $request->file_bimbingan;
            if ($oldData->file_bimbingan !== $filename) {
                Storage::delete('public/uploads/ta/bimbingan/' . $oldData->file_bimbingan);
                $file = $request->file('file_bimbingan');
                $filename = $file->getClientOriginalName();
                $path = 'public/uploads/ta/bimbingan/';
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
            return back()->with('success', 'Bimbingan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan TA updated failed');
        }
    }

    public function updateBerkas(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $rules = [
            'judul' => 'required',
        ];
        $data_ta = TaMhs::findOrFail($id);
        if ($data_ta->status_judul === '2') {
            $rules = array_merge($rules, [
                'file_proposal' => 'required',
            ]);
        }
        if ($data_ta->status_ver_proposal === '2') {
            $rules = array_merge($rules, [
                'file_ta' => 'required',
                'file_laporan' => 'required',
            ]);
        }
        if ($data_ta->status_sidang_ta === '3') {
            $rules = array_merge($rules, [
                'file_revisi_sidang' => 'required',
                'ipk' => 'required',
            ]);
        }
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = TaMhs::where('id_ta_mhs', $id)->first();
            $data = [
                'judul' => $request->judul,
            ];
            /* File TA */
            $filenameTA = $request->file_ta ?? null;
            if ($oldData->file_ta !== null && $oldData->file_ta !== $filenameTA) {
                Storage::delete('public/uploads/ta/file_ta/' . $oldData->file_ta);
            }
            if ($request->hasFile('file_ta')) {
                $file = $request->file('file_ta');
                $filenameTA = $file->getClientOriginalName();
                $path = 'public/uploads/ta/file_ta/';
                $file->storeAs($path, $filenameTA);
                $data['file_ta'] = $filenameTA;
            }
            /* File Laporan */
            $filenameLaporan = $request->file_laporan ?? null;
            if ($oldData->file_laporan !== null && $oldData->file_laporan !== $filenameLaporan) {
                Storage::delete('public/uploads/ta/file_laporan/' . $oldData->file_laporan);
            }
            if ($request->hasFile('file_laporan')) {
                $file = $request->file('file_laporan');
                $filenameLaporan = $file->getClientOriginalName();
                $path = 'public/uploads/ta/file_laporan/';
                $file->storeAs($path, $filenameLaporan);
                $data['file_laporan'] = $filenameLaporan;
            }
            /* File Proposal */
            $filenameProposal = $request->file_proposal ?? null;
            if ($oldData->file_proposal !== null && $oldData->file_proposal !== $filenameProposal) {
                Storage::delete('public/uploads/sempro/file/' . $oldData->file_proposal);
            }
            if ($request->hasFile('file_proposal')) {
                $file = $request->file('file_proposal');
                $filenameSempro = $file->getClientOriginalName();
                $path = 'public/uploads/sempro/file/';
                $file->storeAs($path, $filenameSempro);
                $data['file_proposal'] = $filenameSempro;
            }
            /* File Revisi Sidang */
            $filenameRevisi = $request->file_revisi_sidang ?? null;
            if ($oldData->file_revisi_sidang !== null && $oldData->file_revisi_sidang !== $filenameRevisi) {
                Storage::delete('public/uploads/ta/file_revisi_sidang/' . $oldData->file_revisi_sidang);
            }
            if ($request->hasFile('file_revisi_sidang')) {
                $file = $request->file('file_revisi_sidang');
                $filenameRevisi = $file->getClientOriginalName();
                $path = 'public/uploads/ta/file_revisi_sidang/';
                $file->storeAs($path, $filenameRevisi);
                $data['file_revisi_sidang'] = $filenameRevisi;
                $data['ipk'] = $request->ipk;
            }
            // dd($data);
            $oldData->update($data);
            DB::commit();
            return back()->with('success', 'Pengajuan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Pengajuan TA updated failed');
        }
    }

    public function storeJudul(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_ta_mhs' => 'required',
            'mahasiswa_id' => 'required|exists:mahasiswas,id_mahasiswa',
            'judul' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            TaMhs::create([
                'id_ta_mhs' => $request->id_ta_mhs,
                'mahasiswa_id' => $request->mahasiswa_id,
                'judul' => $request->judul,
            ]);
            DB::commit();

            return to_route('MhsTA')->with('success', 'Pengajuan Judul created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsTA')->with('error', 'Pengajuan Judul created failed');
        }
    }

    public function updateJudul(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'judul' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'judul' => $request->judul,
            ];

            // dd($data);
            $ta = TaMhs::findOrFail($id);
            $ta->update($data);
            DB::commit();
            return to_route('MhsTA')->with('success', 'Pengajuan Judul updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsTA')->with('error', 'Pengajuan Judul updated failed');
        }
    }
}
