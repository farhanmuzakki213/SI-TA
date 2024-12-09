<?php

namespace App\Http\Controllers\Dosen\Kprodi;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Http\Resources\MhsPklResource;
use App\Http\Resources\MhsPklUsulanResource;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\PklMhs;
use App\Models\Ruangan;
use App\Models\Sesi;
use App\Models\UsulanTempatPkl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MhspklController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id_user = auth()->user()->id;
        $id_dosen = Dosen::where('user_id', $id_user)->first()->id_dosen;
        $kaprodi = Pimpinan::where('dosen_id', $id_dosen)->first()->prodi_id;
        $usulan = UsulanTempatPkl::with('r_mahasiswa.r_kelas.r_prodi', 'r_roleTempatPkls.r_tempatPkls')
            ->whereHas('r_mahasiswa.r_kelas', function ($query) use ($kaprodi) {
                $query->where('prodi_id', $kaprodi);
            })
            ->get();
        return Inertia::render('main/kaprodi/mhspkl/index', [
            'data_usulanpkl' => MhsPklUsulanResource::collection($usulan),
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
        $data_mhs = PklMhs::where('id_pkl_mhs', $id)
            ->with('r_usulan.r_mahasiswa.r_user', 'r_usulan.r_mahasiswa.r_kelas.r_prodi', 'r_usulan.r_roleTempatPkls.r_tempatPkls', 'r_pembimbing', 'r_penguji')
            ->get();
        $mahasiswa_id = PklMhs::where('id_pkl_mhs', $id)->with('r_usulan')->first();
        // dd($data_mhs->toArray());
        $RSTterpakai = Booking::select('ruangan_id', 'sesi_id', 'tgl_booking')->where('status_booking', '1')->get()->toArray();
        $id_dosens = PklMhs::whereHas('r_usulan', function ($query) use ($mahasiswa_id) {
            $query->where('mahasiswa_id', $mahasiswa_id->r_usulan->mahasiswa_id);
        })
            ->select('pembimbing_id', 'penguji_id')
            ->get()
            ->flatMap(fn($item) => [$item->pembimbing_id, $item->penguji_id])
            ->unique()
            ->values()
            ->toArray();
        $mahasiswa_id = PklMhs::where('status_ver_pkl', '3')
            ->where(function ($query) use ($id_dosens) {
                $query->whereIn('pembimbing_id', $id_dosens)
                    ->orWhereIn('penguji_id', $id_dosens);
            })
            ->with('r_usulan')
            ->get()
            ->map(function ($pklMhs) {
                return $pklMhs->r_usulan->mahasiswa_id;
            })
            ->toArray();
        $STDosen = Booking::select('sesi_id', 'tgl_booking')->where('status_booking', '1')
            ->whereIn('mahasiswa_id', $mahasiswa_id)
            ->get()
            ->toArray();
        return Inertia::render('main/kaprodi/mhspkl/detail', [
            'data_mhs' => MhsPklResource::collection($data_mhs),
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

    public function updateUsulan(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'status_usulan' => 'required',
            'komentar' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            if ($request->status_usulan == '3') {
                $nextNumber = CariNomor::getCariNomor(PklMhs::class, 'id_pkl_mhs');
                $dataPkl = [
                    'id_pkl_mhs' => $nextNumber,
                    'pembimbing_id' => $request->pembimbing_id,
                    'penguji_id' => $request->penguji_id,
                    'usulan_tempat_pkl_id' => $request->id_usulan,
                ];
                PklMhs::create($dataPkl);
            }
            $data = [
                'status_usulan' => $request->status_usulan,
                'komentar' => $request->komentar,
            ];

            $usulanpkl = UsulanTempatPkl::findOrFail($id);
            $usulanpkl->update($data);
            DB::commit();
            return to_route('MhsPklKprodi')->with('success', 'Usulan Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('MhsPklKprodi')->with('error', 'Usulan Pkl updated failed');
        }
    }

    public function updatePkl(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'pembimbing_id' => 'required|exists:dosens,id_dosen',
            'penguji_id' => 'required|exists:dosens,id_dosen',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = [
                'pembimbing_id' => $request->pembimbing_id,
                'penguji_id' => $request->penguji_id,
            ];

            $pkl = PklMhs::findOrFail($id);
            $pkl->update($data);
            DB::commit();
            return back()->with('success', 'Pembimbing dan Penguji Pkl updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Pembimbing dan Penguji Pkl updated failed');
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
            'tipe' => 'required|string'
        ]);
        $validator->after(function ($validator) use ($request) {
            $exists = Booking::where('ruangan_id', $request->ruangan_id)
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

            return to_route('booking')->with('success', 'Jadwal Ruangan created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('booking')->with('error', 'Jadwal Ruangan created failed');
        }
    }

    public function updateJadwal(Request $request, string $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_booking' => 'required',
            'ruangan_id' => 'required|exists:ruangan,id_ruangan',
            'sesi_id' => 'required|exists:sesi,id_sesi',
            'mahasiswa_id' => 'required|exists:mahasiswas,id_mahasiswa',
            'tgl_booking' => 'required',
            'tipe' => 'required|string',
            'status_booking' => 'required|string'
        ]);
        $validator->after(function ($validator) use ($request) {
            $exists = Booking::where('ruangan_id', $request->ruangan_id)
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
                'id_booking' => $request->id_booking,
                'ruangan_id' => $request->ruangan_id,
                'sesi_id' => $request->sesi_id,
                'mahasiswa_id' => $request->mahasiswa_id,
                'tgl_booking' => $request->tgl_booking,
                'tipe' => $request->tipe,
                'status_booking' => $request->status_booking
            ];

            $rTersedia = Booking::findOrFail($id);
            $rTersedia->update($data);
            DB::commit();
            return to_route('booking')->with('success', 'Jadwal Ruangan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('booking')->with('error', 'Jadwal Ruangan updated failed');
        }
    }
}
