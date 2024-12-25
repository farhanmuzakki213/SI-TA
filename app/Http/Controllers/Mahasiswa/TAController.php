<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsResource;
use App\Http\Resources\MhsSemproResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Mahasiswa;
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

        $id_ta_mhs = $data_ta->first()->id_ta_mhs;
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
        $data_bimbingan_1 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_1')->get();
        $data_bimbingan_2 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_2')->get();
        $data_bimbingan = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->get();
        // dd($data_ta, $data_sempro->toArray());
        return Inertia::render('main/mahasiswa/ta/index', [
            'data_mahasiswa' => MhsResource::collection($mahasiswa),
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_bimbingan' => MhsBimbinganTAResource::collection($data_bimbingan),
            'data_bimbingan_1' => MhsBimbinganTAResource::collection($data_bimbingan_1),
            'data_bimbingan_2' => MhsBimbinganTAResource::collection($data_bimbingan_2),
            'data_sempro' => MhsSemproResource::collection($data_sempro),
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

            return to_route('MhsTA')->with('success', 'Bimbingan TA created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsTA')->with('error', 'Bimbingan TA created failed'.$e->getMessage());
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
            return to_route('MhsTA')->with('success', 'Bimbingan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsTA')->with('error', 'Bimbingan TA updated failed');
        }
    }

    public function updateBerkas(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'judul' => 'required',
            'file_proposal' => 'required',
            'file_ta' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $oldData = TaMhs::where('id_ta_mhs', $id)->first();
            $filenameTA = $request->file_ta ?? null;
            if ($oldData->file_ta !== null && $oldData->file_ta !== $filenameTA) {
                Storage::delete('public/uploads/ta/file_ta/' . $oldData->file_ta);
            }
            $filenameProposal = $request->file_proposal ?? null;
            if ($oldData->file_proposal !== null && $oldData->file_proposal !== $filenameProposal) {
                Storage::delete('public/uploads/sempro/file/' . $oldData->file_proposal);
            }
            if ($request->hasFile('file_ta')) {
                $file = $request->file('file_ta');
                $filenameTA = $file->getClientOriginalName();
                $path = 'public/uploads/ta/file_ta/';
                $file->storeAs($path, $filenameTA);
            }
            $data = [
                'judul' => $request->judul,
                'file_ta' => $filenameTA,
            ];
            if ($request->hasFile('file_proposal')) {
                $file = $request->file('file_proposal');
                $filenameSempro = $file->getClientOriginalName();
                $path = 'public/uploads/sempro/file/';
                $file->storeAs($path, $filenameSempro);
                $data['file_proposal'] = $filenameSempro;
            }
            // dd($data);
            $oldData->update($data);
            DB::commit();
            return to_route('MhsTA')->with('success', 'Pengajuan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsTA')->with('error', 'Pengajuan TA updated failed');
        }
    }
}
