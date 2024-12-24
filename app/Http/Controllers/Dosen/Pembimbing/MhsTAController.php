<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Dosen;
use App\Models\TaBimbingan;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MhsTAController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $dosen = Dosen::where('user_id', $id_user)->with('r_prodi')->first();
        $data_ta = TaMhs::with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji_1',
                'r_penguji_2',
                'r_sekretaris',
                'r_ketua',
            )
            ->where('pembimbing_1_id', $dosen->id_dosen)
            ->OrWhere('pembimbing_2_id', $dosen->id_dosen)
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        return Inertia::render('main/pembimbing/mhsta/index', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_dosen' => $dosen,
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $dosen = Dosen::where('user_id', $id_user)->with('r_prodi')->first();
        $data_ta = TaMhs::with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji_1',
                'r_penguji_2',
                'r_sekretaris',
                'r_ketua',
            )
            ->where('id_ta_mhs', $id)
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        $id_ta_mhs = $data_ta->first()->id_ta_mhs;
        $data_bimbingan = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('dosen_id', $dosen->id_dosen)->get();
        $data_bimbingan_1 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_1')->whereNot('status_bimbingan_ta', '1')->get();
        $data_bimbingan_2 = TaBimbingan::where('ta_mhs_id', $id_ta_mhs)->where('sebagai', 'pembimbing_2')->whereNot('status_bimbingan_ta', '1')->get();
        return Inertia::render('main/pembimbing/mhsta/detail', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_bimbingan' => MhsBimbinganTAResource::collection($data_bimbingan),
            'data_bimbingan_1' => MhsBimbinganTAResource::collection($data_bimbingan_1),
            'data_bimbingan_2' => MhsBimbinganTAResource::collection($data_bimbingan_2),
            'data_dosen' => $dosen,
        ]);
    }

    public function updateBimbingan(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'status_bimbingan_ta' => 'required|in:2,3',
            'komentar' => 'required',
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
                'status_bimbingan_ta' => $request->status_bimbingan_ta,
                'komentar' => $request->komentar,
                'file_bimbingan' => $filename
            ];
            // dd($data);
            $bimbingan = TaBimbingan::findOrFail($id);
            $bimbingan->update($data);
            DB::commit();
            return back()->with('success', 'Bimbingan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan TA updated failed');
        }
    }

    public function tolakBimbingan(Request $request, string $id)
    {
        // dd("data reques",$request->all(), $id);
        $validator = Validator::make($request->all(), [
            'dosen_id' => 'required|exists:dosens,id_dosen',
            'sebagai' => 'required|in:pembimbing_1,pembimbing_2',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'dosen_id' => $request->dosen_id,
                'sebagai' => $request->sebagai,
            ];
            // dd($data);
            $bimbingan = TaBimbingan::findOrFail($id);
            $bimbingan->update($data);
            DB::commit();
            return back()->with('success', 'Bimbingan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan TA updated failed');
        }
    }

    public function accSidangTA(Request $request, string $id)
    {
        // dd("data reques",$request->all(), $id);
        $validator = Validator::make($request->all(), [
            'acc_pembimbing_satu' => 'required|in:0,1',
            'acc_pembimbing_dua' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'acc_pembimbing_satu' => $request->acc_pembimbing_satu ?? '0',
                'acc_pembimbing_dua' => $request->acc_pembimbing_dua ?? '0',
            ];
            // dd($data);
            $accbimbingan = TaMhs::findOrFail($id);
            $accbimbingan->update($data);
            DB::commit();
            return back()->with('success', 'Bimbingan TA updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Bimbingan TA updated failed'.$e->getMessage());
        }
    }
}
