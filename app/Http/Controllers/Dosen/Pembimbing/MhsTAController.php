<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsTANilaiResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Dosen;
use App\Models\TaBimbingan;
use App\Models\TaMhs;
use App\Models\TaNilai;
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
            ->where('status_judul', '2')
            ->where('pembimbing_1_id', $dosen->id_dosen)
            ->OrWhere('pembimbing_2_id', $dosen->id_dosen)
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        // dd($data_ta->toArray());
        return Inertia::render('main/pembimbing/mhsta/index', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_dosen' => $dosen,
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $dosen = Dosen::where('user_id', $id_user)->with('r_prodi')->first();
        // dd($dosen);
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
        $data_bimbingan = TaBimbingan::where('ta_mhs_id', $id)->where('dosen_id', $dosen->id_dosen)->get();
        $data_bimbingan_1 = TaBimbingan::where('ta_mhs_id', $id)->where('sebagai', 'pembimbing_1')->whereNot('status_bimbingan_ta', '1')->get();
        $data_bimbingan_2 = TaBimbingan::where('ta_mhs_id', $id)->where('sebagai', 'pembimbing_2')->whereNot('status_bimbingan_ta', '1')->get();
        $data_nilai = TaNilai::where('ta_mhs_id', $id)
            ->where('dosen_id', $dosen->id_dosen)
            ->get();
            // dd($data_nilai->toArray());
        return Inertia::render('main/pembimbing/mhsta/detail', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'data_bimbingan' => MhsBimbinganTAResource::collection($data_bimbingan),
            'data_bimbingan_1' => MhsBimbinganTAResource::collection($data_bimbingan_1),
            'data_bimbingan_2' => MhsBimbinganTAResource::collection($data_bimbingan_2),
            'data_dosen' => $dosen,
            'data_nilai' => MhsTANilaiResource::collection($data_nilai),
            'nextNumber_nilai' => CariNomor::getCariNomor(TaNilai::class, 'id_ta_nilai'),
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
            return back()->with('error', 'Bimbingan TA updated failed' . $e->getMessage());
        }
    }

    public function storeNilai(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_ta_nilai' => 'required',
            'ta_mhs_id' => 'required',
            'etika_dan_penampilan' => 'required',
            'komunikasi_dan_sistematika' => 'required',
            'penguasaan_materi_pengetahuan_dasar' => 'required',
            'penguasaan_materi_pemahaman' => 'required',
            'penguasaan_materi_kemampuan_terapan' => 'required',
            'bahasa_dan_tata_tulis' => 'required',
            'penerapan_siklus_pengembangan_sistem' => 'required',
            'kesesuian_hasil_dengan_kebutuhan_sistem' => 'required',
            'program_sistem' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        $total_nilai = ($request->etika_dan_penampilan * 0.05) +
            ($request->komunikasi_dan_sistematika * 0.05) +
            ($request->penguasaan_materi_pengetahuan_dasar * 0.1) +
            ($request->penguasaan_materi_pemahaman * 0.1) +
            ($request->penguasaan_materi_kemampuan_terapan * 0.2) +
            ($request->bahasa_dan_tata_tulis * 0.05) +
            ($request->penerapan_siklus_pengembangan_sistem * 0.15) +
            ($request->kesesuian_hasil_dengan_kebutuhan_sistem * 0.15) +
            ($request->program_sistem * 0.15);
        $nilai_data = [
            'etika_dan_penampilan' => $request->etika_dan_penampilan,
            'komunikasi_dan_sistematika' => $request->komunikasi_dan_sistematika,
            'penguasaan_materi_pengetahuan_dasar' => $request->penguasaan_materi_pengetahuan_dasar,
            'penguasaan_materi_pemahaman' => $request->penguasaan_materi_pemahaman,
            'penguasaan_materi_kemampuan_terapan' => $request->penguasaan_materi_kemampuan_terapan,
            'bahasa_dan_tata_tulis' => $request->bahasa_dan_tata_tulis,
            'penerapan_siklus_pengembangan_sistem' => $request->penerapan_siklus_pengembangan_sistem,
            'kesesuian_hasil_dengan_kebutuhan_sistem' => $request->kesesuian_hasil_dengan_kebutuhan_sistem,
            'program_sistem' => $request->program_sistem,
            'total_nilai' => round($total_nilai, 2),
        ];
        DB::beginTransaction();
        try {
            $id_user = auth()->user()->id;
            $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
            $pembimbing_1 = TaMhs::where('id_ta_mhs', $request->ta_mhs_id)->where('pembimbing_1_id', $id_dosen)->exists();
            $pembimbing_2 = TaMhs::where('id_ta_mhs', $request->ta_mhs_id)->where('pembimbing_2_id', $id_dosen)->exists();
            if ($pembimbing_1) {
                $sebagai = 'pembimbing_1';
            } elseif ($pembimbing_2) {
                $sebagai = 'pembimbing_2';
            } else {
                $sebagai = null;
            }
            // dd($sebagai);
            TaNilai::create([
                'id_ta_nilai' => $request->id_ta_nilai,
                'ta_mhs_id' => $request->ta_mhs_id,
                'dosen_id' => $id_dosen,
                'nilai' => json_encode($nilai_data),
                'sebagai' => $sebagai,
                'komentar' => $request->komentar,
            ]);
            DB::commit();

            return back()->with('success', 'Nilai Tugas Akhir created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Nilai Tugas Akhir created failed'.$e->getMessage());
        }
    }

    public function updateNilai(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'etika_dan_penampilan' => 'required',
            'komunikasi_dan_sistematika' => 'required',
            'penguasaan_materi_pengetahuan_dasar' => 'required',
            'penguasaan_materi_pemahaman' => 'required',
            'penguasaan_materi_kemampuan_terapan' => 'required',
            'bahasa_dan_tata_tulis' => 'required',
            'penerapan_siklus_pengembangan_sistem' => 'required',
            'kesesuian_hasil_dengan_kebutuhan_sistem' => 'required',
            'program_sistem' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        $total_nilai = ($request->etika_dan_penampilan * 0.05) +
            ($request->komunikasi_dan_sistematika * 0.05) +
            ($request->penguasaan_materi_pengetahuan_dasar * 0.1) +
            ($request->penguasaan_materi_pemahaman * 0.1) +
            ($request->penguasaan_materi_kemampuan_terapan * 0.2) +
            ($request->bahasa_dan_tata_tulis * 0.05) +
            ($request->penerapan_siklus_pengembangan_sistem * 0.15) +
            ($request->kesesuian_hasil_dengan_kebutuhan_sistem * 0.15) +
            ($request->program_sistem * 0.15);
        $nilai_data = [
            'etika_dan_penampilan' => $request->etika_dan_penampilan,
            'komunikasi_dan_sistematika' => $request->komunikasi_dan_sistematika,
            'penguasaan_materi_pengetahuan_dasar' => $request->penguasaan_materi_pengetahuan_dasar,
            'penguasaan_materi_pemahaman' => $request->penguasaan_materi_pemahaman,
            'penguasaan_materi_kemampuan_terapan' => $request->penguasaan_materi_kemampuan_terapan,
            'bahasa_dan_tata_tulis' => $request->bahasa_dan_tata_tulis,
            'penerapan_siklus_pengembangan_sistem' => $request->penerapan_siklus_pengembangan_sistem,
            'kesesuian_hasil_dengan_kebutuhan_sistem' => $request->kesesuian_hasil_dengan_kebutuhan_sistem,
            'program_sistem' => $request->program_sistem,
            'total_nilai' => round($total_nilai, 2),
        ];
        DB::beginTransaction();
        try {
            $data = [
                'nilai' => json_encode($nilai_data),
                'komentar' => $request->komentar,
            ];

            $nilaita = TaNilai::findOrFail($id);
            $nilaita->update($data);
            DB::commit();
            return back()->with('success', 'Nilai Tugas Akhir updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Nilai Tugas Akhir updated failed');
        }
    }
}
