<?php

namespace App\Http\Controllers\Dosen\Pembimbing;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\MhsSemproNilaiResource;
use App\Http\Resources\MhsSemproResource;
use App\Models\Dosen;
use App\Models\SemproMhs;
use App\Models\SemproNilai;
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
            ->where('pembimbing_1_id', $id_dosen)
            ->OrWhere('pembimbing_2_id', $id_dosen)
            ->get();
        return Inertia::render('main/pembimbing/mhssempro/index', [
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
            ->where('sebagai', 'pembimbing_1')
            ->OrWhere('sebagai', 'pembimbing_2')
            ->get();
            // dd($data_nilai->toArray());
        return Inertia::render('main/pembimbing/mhssempro/detail', [
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
            $id_user = auth()->user()->id;
            $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
            $pembimbing_1 = SemproMhs::where('id_sempro_mhs', $request->sempro_mhs_id)->where('pembimbing_1_id', $id_dosen)->exists();
            $pembimbing_2 = SemproMhs::where('id_sempro_mhs', $request->sempro_mhs_id)->where('pembimbing_2_id', $id_dosen)->exists();
            if($pembimbing_1){
                $sebagai = 'pembimbing_1';
            }elseif($pembimbing_2){
                $sebagai = 'pembimbing_2';
            }else{
                $sebagai = null;
            }
            // dd($sebagai, $pembimbing_1, $pembimbing_2);
            SemproNilai::create([
                'id_sempro_nilai' => $request->id_sempro_nilai,
                'sempro_mhs_id' => $request->sempro_mhs_id,
                'dosen_id' => $id_dosen,
                'nilai' => json_encode($nilai_data),
                'sebagai' => $sebagai,
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
            'keaktifan' => 'required',
            'komunikasi' => 'required',
            'problem_solving' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error 123', $validator->errors()->first());
        }
        $total_nilai = ($request->keaktifan * 0.30) + ($request->komunikasi * 0.30) + ($request->problem_solving * 0.40);
        $nilai_data = [
            'keaktifan' => $request->keaktifan,
            'komunikasi' => $request->komunikasi,
            'problem_solving' => $request->problem_solving,
            'total_nilai' => round($total_nilai, 2),
        ];
        DB::beginTransaction();
        try {
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
