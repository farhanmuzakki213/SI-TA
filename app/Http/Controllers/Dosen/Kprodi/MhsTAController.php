<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Http\Resources\MhsBimbinganTAResource;
use App\Http\Resources\MhsTAResource;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use App\Models\Ruangan;
use App\Models\SemproMhs;
use App\Models\Sesi;
use App\Models\TaBimbingan;
use App\Models\TaMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MhsTAController extends Controller
{
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->with('r_prodi')->first();
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
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi->prodi_id);
            })
            ->get();
        // dd($data_ta, $id_mahasiswa->toArray());
        // dd($kaprodi->toArray());
        return Inertia::render('main/kaprodi/mhsta/index', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'dosenPembimbingOptions' => Dosen::where('prodi_id', $kaprodi->prodi_id)->where('status_dosen', '1')->get()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
        ]);
    }

    public function detail($id)
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->with('r_prodi')->first();
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
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi->prodi_id);
            })
            ->get();
        $RSTterpakai = Booking::select('ruangan_id', 'sesi_id', 'tgl_booking')->where('status_booking', '1')->get()->toArray();
        /* Cek Jadwal Dosen TA */
        $id_dosens_ta = TaMhs::where('id_ta_mhs', $id)
            ->select('pembimbing_1_id', 'pembimbing_2_id', 'ketua_id', 'sekretaris_id', 'penguji_1_id', 'penguji_2_id')
            ->get()
            ->flatMap(fn($item) => [$item->pembimbing_1_id, $item->pembimbing_2_id, $item->ketua_id, $item->sekretaris_id, $item->penguji_1_id, $item->penguji_2_id])
            ->unique()
            ->values()
            ->toArray();
        $mahasiswa_ta_id = TaMhs::where('status_ver_ta', '3')
            ->where(function ($query) use ($id_dosens_ta) {
                $query->whereIn('pembimbing_1_id', $id_dosens_ta)
                    ->orWhereIn('pembimbing_2_id', $id_dosens_ta)
                    ->orWhereIn('ketua_id', $id_dosens_ta)
                    ->orWhereIn('sekretaris_id', $id_dosens_ta)
                    ->orWhereIn('penguji_1_id', $id_dosens_ta)
                    ->orWhereIn('penguji_2_id', $id_dosens_ta);
            })
            ->get()
            ->map(function ($ta) {
                return $ta->mahasiswa_id;
            })
            ->toArray();
        /* Cek Jadwal Dosen Sempro */
        $mahasiswa_sempro_id = SemproMhs::where('status_sempro', '3')
            ->where(function ($query) use ($id_dosens_ta) {
                $query->whereIn('pembimbing_1_id', $id_dosens_ta)
                    ->orWhereIn('pembimbing_2_id', $id_dosens_ta)
                    ->orWhereIn('penguji_id', $id_dosens_ta);
            })
            ->get()
            ->map(function ($sempro) {
                return $sempro->mahasiswa_id;
            })
            ->toArray();
        /* Cek Jadwal PKL */
        $mahasiswa_pkl_id = PklMhs::where('status_ver_pkl', '3')
            ->where(function ($query) use ($id_dosens_ta) {
                $query->whereIn('pembimbing_id', $id_dosens_ta)
                    ->orWhereIn('penguji_id', $id_dosens_ta);
            })
            ->with('r_usulan')
            ->get()
            ->map(function ($pklMhs) {
                return $pklMhs->r_usulan->mahasiswa_id;
            })
            ->toArray();
        $mahasiswa_id = array_unique(array_merge($mahasiswa_sempro_id, $mahasiswa_ta_id, $mahasiswa_pkl_id));
        $STDosen = Booking::select('sesi_id', 'tgl_booking')->where('status_booking', '1')
            ->whereIn('mahasiswa_id', $mahasiswa_id)
            ->get()
            ->toArray();
        // dd($STDosen, $RSTterpakai);
        return Inertia::render('main/kaprodi/mhsta/detail', [
            'data_ta' => MhsTAResource::collection($data_ta),
            'nextNumber' => CariNomor::getCariNomor(Booking::class, 'id_booking'),
            'ruanganOptions' => BaseOptionsResource::collection(Ruangan::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'kode_ruangan', 'id_ruangan');
            })),
            'sesiOptions' => BaseOptionsResource::collection(Sesi::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'periode_sesi', 'id_sesi');
            })),
            'bookingused' => $RSTterpakai,
            'jambookingused' => $STDosen,
            'dosenPengujiOptions' => Dosen::where('status_dosen', '1')->get()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
            'dosenPembimbingOptions' => Dosen::where('prodi_id', $kaprodi->prodi_id)->where('status_dosen', '1')->get()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
        ]);
    }

    public function updatePenugasan(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_judul' => 'required',
            'komentar_judul' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {

            $data = [
                'status_judul' => $request->status_judul,
                'komentar_judul' => $request->komentar_judul,
            ];
            if ($request->status_judul == '2') {
                $data['pembimbing_1_id'] = $request->pembimbing_1_id;
                $data['pembimbing_2_id'] = $request->pembimbing_2_id;
            }
            // dd($data);
            $ta = TaMhs::findOrFail($id);
            $ta->update($data);
            DB::commit();
            return to_route('MhsTAKprodi')->with('success', 'Verifikasi Judul updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsTAKprodi')->with('error', 'Verifikasi Judul updated failed');
        }
    }

    public function updateDosen(Request $request, string $id)
    {
        // dd($request->all());
        $rules = [
            'pembimbing_1_id' => 'required|exists:dosens,id_dosen',
            'pembimbing_2_id' => 'required|exists:dosens,id_dosen',
        ];
        $data_ta = TaMhs::findOrFail($id);
        if ($data_ta->status_ver_ta === '2') {
            $rules = array_merge($rules, [
                'ketua_id' => 'required|exists:dosens,id_dosen',
                'sekretaris_id' => 'required|exists:dosens,id_dosen',
                'penguji_1_id' => 'required|exists:dosens,id_dosen',
                'penguji_2_id' => 'required|exists:dosens,id_dosen',
            ]);
        }
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data_penugasan = [
                'pembimbing_1_id' => $request->pembimbing_1_id,
                'pembimbing_2_id' => $request->pembimbing_2_id,
            ];
            if ($data_ta->status_ver_ta === '2') {
                $data_penugasan['ketua_id'] = $request->ketua_id;
                $data_penugasan['sekretaris_id'] = $request->sekretaris_id;
                $data_penugasan['penguji_1_id'] = $request->penguji_1_id;
                $data_penugasan['penguji_2_id'] = $request->penguji_2_id;
            }
            // dd($data_penugasan);
            $data_ta->update($data_penugasan);
            DB::commit();
            return back()->with('success', 'Dosen Pembimbing ' . ($data_ta->status_ver_ta === '2' ? '& Penguji' : '') . ' updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Dosen Pembimbing ' . ($data_ta->status_ver_ta === '2' ? '& Penguji' : '') . ' updated failed');
        }
    }

    public function storeJadwal(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_booking' => 'required',
            'ruangan_id' => 'required|exists:ruangan,id_ruangan',
            'sesi_id' => 'required|exists:sesi,id_sesi',
            'mahasiswa_id' => 'required|exists:mahasiswas,id_mahasiswa',
            'tgl_booking' => 'required',
            'tipe' => 'required|string',
        ]);
        $validator->after(function ($validator) use ($request) {
            $exists = Booking::where('ruangan_id', $request->ruangan_id)
                ->where('tgl_booking', $request->tgl_booking)
                ->where('sesi_id', $request->sesi_id)
                ->where('tgl_booking', $request->tgl_booking)
                ->where('status_booking', '1')
                ->exists();
            if ($exists) {
                $validator->errors()->add('ruangan_id', 'Kombinasi ruangan dan sesi sudah ada');
            }
        });
        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            Booking::create([
                'id_booking' => $request->id_booking,
                'ruangan_id' => $request->ruangan_id,
                'sesi_id' => $request->sesi_id,
                'mahasiswa_id' => $request->mahasiswa_id,
                'tgl_booking' => $request->tgl_booking,
                'tipe' => $request->tipe
            ]);
            DB::commit();

            return back()->with('success', 'Jadwal created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Jadwal created failed');
        }
    }

    public function updateJadwal(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'ruangan_id' => 'required|exists:ruangan,id_ruangan',
            'sesi_id' => 'required|exists:sesi,id_sesi',
            'tgl_booking' => 'required',
            'status_booking' => 'required|string'
        ]);
        $validator->after(function ($validator) use ($request) {
            $exists = Booking::where('ruangan_id', $request->ruangan_id)
                ->where('tgl_booking', $request->tgl_booking)
                ->where('sesi_id', $request->sesi_id)
                ->where('tgl_booking', $request->tgl_booking)
                ->exists();
            if ($exists) {
                $validator->errors()->add('ruangan_id', 'Kombinasi ruangan dan sesi sudah ada');
            }
        });

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'ruangan_id' => $request->ruangan_id,
                'sesi_id' => $request->sesi_id,
                'tgl_booking' => $request->tgl_booking,
                'status_booking' => $request->status_booking
            ];

            $rTersedia = Booking::findOrFail($id);
            $rTersedia->update($data);
            DB::commit();
            return back()->with('success', 'Jadwal updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Jadwal updated failed');
        }
    }


}
