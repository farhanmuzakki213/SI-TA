<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_mahasiswa = Mahasiswa::with('r_user', 'r_kelas.r_prodi')->orderBy('id_mahasiswa')->get();

        $kelas = Kelas::all();
        $users = User::all();
        $nextNumber = $this->getCariNomor();
        // dd($data_mahasiswa->toArray(), $kelas->toArray(), $users->toArray());
        return Inertia::render('main/admin/mahasiswa/mahasiswa', [
            'data_mahasiswa' => $data_mahasiswa,
            'nextNumber' => $nextNumber,
            'kelasOptions' => $kelas->map(fn($p) => [
                'label' => $p->nama_kelas,
                'value' => $p->id_kelas
            ]),
            'userOptions' => $users->map(fn($u) => [
                'label' => $u->name,
                'value' => $u->id
            ])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'id_mahasiswa' => 'required',
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'kelas_id' => 'required|exists:kelas,id_kelas',
            'nama_mahasiswa' => 'required|string',
            'nim_mahasiswa' => 'required|string',
            'gender' => 'required|string',
            'status_mahasiswa' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->nama_mahasiswa,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user_id = $user->id;

            Mahasiswa::create([
                'id_mahasiswa' => $request->id_mahasiswa,
                'user_id' => $user_id,
                'kelas_id' => $request->kelas_id,
                'nama_mahasiswa' => $request->nama_mahasiswa,
                'nim_mahasiswa' => $request->nim_mahasiswa,
                'gender' => $request->gender,
                'status_mahasiswa' => $request->status_mahasiswa,
            ]);
            event(new Registered($user));
            DB::commit();

            return to_route('mahasiswa')->with('success', 'Mahasiswa created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('mahasiswa')->with('error', 'Mahasiswa created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'kelas_id' => 'required|exists:kelas,id_kelas',
            'nama_mahasiswa' => 'required|string',
            'nim_mahasiswa' => 'required|string',
            'gender' => 'required|string',
            'status_mahasiswa' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        // dd($request->nim_mahasiswa);
        DB::beginTransaction();
        try {
            $data = [
                'user_id' => $request->user_id,
                'kelas_id' => $request->kelas_id,
                'nama_mahasiswa' => $request->nama_mahasiswa,
                'nim_mahasiswa' => $request->nim_mahasiswa,
                'gender' => $request->gender,
                'status_mahasiswa' => $request->status_mahasiswa,
            ];

            $mahasiswa = Mahasiswa::findOrFail($id);
            $mahasiswa->update($data);
            DB::commit();
            return to_route('mahasiswa')->with('success', 'Mahasiswa updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('mahasiswa')->with('error', 'Mahasiswa updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mahasiswa $mahasiswa)
    {
        $mahasiswa->delete();

        return to_route('mahasiswa')->with('success', 'Mahasiswa deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:mahasiswas,id_mahasiswa',
        ]);
        $ids = $request->input('ids');
        Mahasiswa::whereIn('id_mahasiswa', $ids)->delete();

        return to_route('mahasiswa')->with('success', 'Mahasiswa deleted successfully');
    }

    function getCariNomor()
    {
        $id_mahasiswa = Mahasiswa::pluck('id_mahasiswa')->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $id_mahasiswa)) {
                return $i;
                break;
            }
        }
        return $i;
    }
}
