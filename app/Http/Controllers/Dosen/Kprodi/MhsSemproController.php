<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Http\Resources\MhsSemproResource;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\Ruangan;
use App\Models\SemproMhs;
use App\Models\Sesi;
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
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->first()->prodi_id;
        $data_sempro = SemproMhs::with(
            'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
            'r_mahasiswa.r_user',
            'r_pembimbing_1',
            'r_pembimbing_2',
            'r_penguji'
        )
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi);
            })
            ->get();
        // dd($data_sempro, $kaprodi);
        return Inertia::render('main/kaprodi/mhssempro/index', [
            'data_sempro' => MhsSemproResource::collection($data_sempro),
            'dosenOptions' => Dosen::all()->map(function ($dosen) {
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
        $data_mhs = SemproMhs::where('id_sempro_mhs', $id)
            ->with(
                'r_mahasiswa.r_kelas.r_prodi.r_jurusan',
                'r_mahasiswa.r_user',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji'
            )
            ->get();
        // dd($data_mhs->toArray());
        $RSTterpakai = Booking::select('ruangan_id', 'sesi_id', 'tgl_booking')->where('status_booking', '1')->get()->toArray();
        $id_dosens = SemproMhs::where('id_sempro_mhs', $id)
            ->select('pembimbing_1_id', 'pembimbing_2_id', 'penguji_id')
            ->get()
            ->flatMap(fn($item) => [$item->pembimbing_1_id, $item->pembimbing_2_id, $item->penguji_id])
            ->unique()
            ->values()
            ->toArray();
        // dd($id_dosens);
        $mahasiswa_id = SemproMhs::where('status_ver_sempro', '3')
            ->where(function ($query) use ($id_dosens) {
                $query->whereIn('pembimbing_1_id', $id_dosens)
                    ->orWhereIn('pembimbing_2_id', $id_dosens)
                    ->orWhereIn('penguji_id', $id_dosens);
            })
            ->get()
            ->map(function ($sempro) {
                return $sempro->mahasiswa_id;
            })
            ->toArray();
        // dd($mahasiswa_id);
        $STDosen = Booking::select('sesi_id', 'tgl_booking')->where('status_booking', '1')
            ->whereIn('mahasiswa_id', $mahasiswa_id)
            ->get()
            ->toArray();
        return Inertia::render('main/kaprodi/mhssempro/detail', [
            'data_mhs' => MhsSemproResource::collection($data_mhs),
            'dosenOptions' => Dosen::all()->map(function ($dosen) {
                return [
                    'value' => $dosen->id_dosen,
                    'label' => $dosen->nama_dosen,
                    'golongan' => $dosen->golongan_id,
                ];
            }),
            'nextNumber' => CariNomor::getCariNomor(Booking::class, 'id_booking'),
            'ruanganOptions' => BaseOptionsResource::collection(Ruangan::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'kode_ruangan', 'id_ruangan');
            })),
            'sesiOptions' => BaseOptionsResource::collection(Sesi::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'periode_sesi', 'id_sesi');
            })),
            'bookingused' => $RSTterpakai,
            'jambookingused' => $STDosen
        ]);
    }

    public function updatePenugasan(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_ver_sempro' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            if ($request->status_ver_sempro == '3') {
                $data_penugasan = [
                    'pembimbing_1_id' => $request->pembimbing_1_id,
                    'pembimbing_2_id' => $request->pembimbing_2_id,
                    'penguji_id' => $request->penguji_id,
                ];
                $sempro = SemproMhs::findOrFail($id);
                $sempro->update($data_penugasan);
            }
            $data = [
                'status_ver_sempro' => $request->status_ver_sempro,
                'komentar' => $request->komentar,
            ];
            $sempro = SemproMhs::findOrFail($id);
            $sempro->update($data);
            DB::commit();
            return to_route('MhsSemproKprodi')->with('success', 'Verifikasi Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsSemproKprodi')->with('error', 'Verifikasi Sempro updated failed');
        }
    }

    public function updateDosen(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'pembimbing_1_id' => 'required',
            'pembimbing_2_id' => 'required',
            'penguji_id' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data_penugasan = [
                'pembimbing_1_id' => $request->pembimbing_1_id,
                'pembimbing_2_id' => $request->pembimbing_2_id,
                'penguji_id' => $request->penguji_id,
            ];
            $sempro = SemproMhs::findOrFail($id);
            $sempro->update($data_penugasan);
            DB::commit();
            return back()->with('success', 'Verifikasi Sempro updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Verifikasi Sempro updated failed');
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
