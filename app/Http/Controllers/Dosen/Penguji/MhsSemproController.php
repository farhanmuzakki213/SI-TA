<?php

namespace App\Http\Controllers\Dosen\Penguji;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsSemproNilaiResource;
use App\Http\Resources\MhsSemproResource;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\SemproMhs;
use App\Models\SemproNilai;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MhsSemproController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $data_sempro = SemproMhs::with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji'
        )
            ->where('penguji_id', $id_dosen)
            ->get();
        // dd($data_sempro->toArray());
        return Inertia::render('main/penguji/mhssempro/index', [
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'dosen_id' => $id_dosen,
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $data_sempro = SemproMhs::with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji'
        )
            ->where('id_sempro_mhs', $id)
            ->get();
        $data_nilai = SemproNilai::where('sempro_mhs_id', $id)
            ->where('dosen_id', $id_dosen)
            ->where('sebagai', 'penguji')
            ->get();
        return Inertia::render('main/penguji/mhssempro/detail', [
            'data_mhs' => MhsSemproResource::collection($data_sempro),
            'dosen_id' => $id_dosen,
            'data_nilai' => MhsSemproNilaiResource::collection($data_nilai),
            'nextNumber_nilai' => CariNomor::getCariNomor(SemproNilai::class, 'id_sempro_nilai'),
        ]);
    }

    public function storeNilai(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_sempro_nilai' => 'required',
            'sempro_mhs_id' => 'required',
            'pendahuluan' => 'required',
            'tinjauan_pustaka' => 'required',
            'metodologi_penelitian' => 'required',
            'bahasa_dan_tata_tulis' => 'required',
            'presentasi' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error 123', $validator->errors()->first());
        }
        $total_nilai = ($request->pendahuluan * 0.2) + ($request->tinjauan_pustaka * 0.2) + ($request->metodologi_penelitian * 0.2) + ($request->bahasa_dan_tata_tulis * 0.2) + ($request->presentasi * 0.2);
        $nilai_data = [
            'pendahuluan' => $request->pendahuluan,
            'tinjauan_pustaka' => $request->tinjauan_pustaka,
            'metodologi_penelitian' => $request->metodologi_penelitian,
            'bahasa_dan_tata_tulis' => $request->bahasa_dan_tata_tulis,
            'presentasi' => $request->presentasi,
            'total_nilai' => round($total_nilai, 2),
        ];
        DB::beginTransaction();
        try {
            $id_user = auth()->user()->id;
            $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
            $total_nilai_sempro = SemproNilai::where('sempro_mhs_id', $request->sempro_mhs_id)
                ->where('sebagai', 'pembimbing_2')
                ->OrWhere('sebagai', 'pembimbing_1')
                ->select('nilai')
                ->get()
                ->map(function ($item) {
                    $nilai = json_decode($item->nilai, true);
                    return $nilai['total_nilai'] ?? 0;
                });
            if ($total_nilai_sempro->count() > 1) {
                $total_nilai_sidang = ($total_nilai_sempro->sum() + $total_nilai) / 3;
                if ($total_nilai_sidang > 75) {
                    $data_sempro = [
                        'status_sempro' => '3',
                    ];
                } else {
                    $data_sempro = [
                        'status_sempro' => '1',
                    ];
                }
                // dd($data_sempro);
                $sempro = SemproMhs::find($request->sempro_mhs_id);
                if (!$sempro) {
                    return back()->with('error', 'Data Sempro tidak ditemukan.');
                }
                if($data_sempro['status_sempro'] === '3') {
                    TaMhs::create([
                        'id_ta_mhs' => CariNomor::getCariNomor(TaMhs::class, 'id_ta_mhs'),
                        'mahasiswa_id' => $sempro->mahasiswa_id,
                        'pembimbing_1_id' => $sempro->pembimbing_1_id,
                        'pembimbing_2_id' => $sempro->pembimbing_2_id,
                        'ketua_id' => $sempro->pembimbing_1_id,
                        'sekretaris_id' => $sempro->penguji_id,
                        'judul' => $sempro->judul_sempro,
                        'file_proposal' => $sempro->file_sempro,
                        'status_ver_proposal' => '2',
                        'status_judul' => '2',
                    ]);
                }
                $sempro->update($data_sempro);
            }
            SemproNilai::create([
                'id_sempro_nilai' => $request->id_sempro_nilai,
                'sempro_mhs_id' => $request->sempro_mhs_id,
                'dosen_id' => $id_dosen,
                'nilai' => json_encode($nilai_data),
                'sebagai' => 'penguji',
            ]);
            DB::commit();

            return back()->with('success', 'Nilai Sempro created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Nilai Sempro created failed');
        }
    }

    public function updateNilai(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $validator = Validator::make($request->all(), [
            'pendahuluan' => 'required',
            'tinjauan_pustaka' => 'required',
            'metodologi_penelitian' => 'required',
            'bahasa_dan_tata_tulis' => 'required',
            'presentasi' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $total_nilai = ($request->pendahuluan * 0.2) + ($request->tinjauan_pustaka * 0.2) + ($request->metodologi_penelitian * 0.2) + ($request->bahasa_dan_tata_tulis * 0.2) + ($request->presentasi * 0.2);
        $nilai_data = [
            'pendahuluan' => $request->pendahuluan,
            'tinjauan_pustaka' => $request->tinjauan_pustaka,
            'metodologi_penelitian' => $request->metodologi_penelitian,
            'bahasa_dan_tata_tulis' => $request->bahasa_dan_tata_tulis,
            'presentasi' => $request->presentasi,
            'total_nilai' => round($total_nilai, 2),
        ];
        DB::beginTransaction();
        try {
            $total_nilai_sempro = SemproNilai::where('sempro_mhs_id', $request->sempro_mhs_id)
                ->where('sebagai', 'pembimbing_2')
                ->OrWhere('sebagai', 'pembimbing_1')
                ->select('nilai')
                ->get()
                ->map(function ($item) {
                    $nilai = json_decode($item->nilai, true);
                    return $nilai['total_nilai'] ?? 0;
                });
            if ($total_nilai_sempro->count() > 1) {
                $total_nilai_sidang = ($total_nilai_sempro->sum() + $total_nilai) / 3;
                if ($total_nilai_sidang > 75) {
                    $data_sempro = [
                        'status_sempro' => '3',
                    ];
                } else {
                    $data_sempro = [
                        'status_sempro' => '1',
                    ];
                }
                // dd($data_sempro);
                $data_booking = [
                    'status_booking' => '2',
                ];
                // dd($data_sempro, $request->sempro_mhs_id);
                $sempro = SemproMhs::find($request->sempro_mhs_id);
                // dd($sempro);
                if (!$sempro) {
                    return back()->with('error', 'Data Sempro tidak ditemukan.');
                }
                $jadwal_sidang = Booking::where('mahasiswa_id', $sempro->mahasiswa_id)
                ->where('tipe', '2')
                ->where('status_booking', '1')
                ->with('r_sesi', 'r_ruangan')
                ->first();
                if ($jadwal_sidang) {
                    $jadwal_sidang->update($data_booking);
                }
                $sempro->update($data_sempro);
            }
            $data = [
                'nilai' => json_encode($nilai_data),
            ];

            $nilaisempro = SemproNilai::findOrFail($id);
            $nilaisempro->update($data);
            DB::commit();
            return back()->with('success', 'Nilai Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Nilai Sempro updated failed');
        }
    }
}
