<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BaseOptionsResource;
use App\Http\Resources\DosenResource;
use App\Models\Dosen;
use App\Models\golongan;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Inertia\Response;
use App\Helpers\CariNomor;

class DosenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        return Inertia::render('main/admin/dosen/dosen', [
            'data_dosen' => DosenResource::collection( Dosen::with('r_user', 'r_prodi', 'r_golongan')->get()),
            'nextNumber' => CariNomor::getCariNomor(Dosen::class, 'id_dosen'),
            'prodiOptions' => BaseOptionsResource::collection(Prodi::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'nama_prodi', 'id_prodi');
            })),
            'golonganOptions' => BaseOptionsResource::collection(golongan::all()->map(function ($p) {
                return new BaseOptionsResource($p, 'nama_golongan', 'id_golongan');
            })),
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'prodi_id' => 'required|exists:prodis,id_prodi',
            'golongan_id' => 'required|exists:golongans,id_golongan',
            'nama_dosen' => 'required|string',
            'nidn_dosen' => 'required|string',
            'gender' => 'required|string',
            'status_dosen' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $nextDosenNumber = $this->getCariNomor(Dosen::class, 'id_dosen');

        DB::beginTransaction();
        try {
            // Create user
            $user = User::create([
                'name' => $request->nama_dosen,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Get user_id after creation
            $user_id = $user->id;

            // Create dosen
            Dosen::create([
                'id_dosen' => $nextDosenNumber,
                'user_id' => $user_id,
                'prodi_id' => $request->prodi_id,
                'golongan_id' =>$request->golongan_id,
                'nama_dosen' => $request->nama_dosen,
                'nidn_dosen' => $request->nidn_dosen,
                'gender' => $request->gender,
                'status_dosen' => $request->status_dosen,
            ]);

            // Trigger registered event
            event(new Registered($user));
            DB::commit();

            return to_route('dosen')->with('success', 'Dosen created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('dosen')->with('error', 'Failed to create dosen');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Dosen $dosen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dosen $dosen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'prodi_id' => 'required|exists:prodis,id_prodi',
            'golongan_id' => 'required|exists:golongans,id_golongan',
            'nama_dosen' => 'required|string',
            'nidn_dosen' => 'required|string',
            'gender' => 'required|string',
            'status_dosen' => 'required|string',
        ]);

        // dd($validator);
        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $data = [
            'user_id' => $request->user_id,
            'prodi_id' => $request->prodi_id,
            'golongan_id' =>$request->golongan_id,
            'nama_dosen' => $request->nama_dosen,
            'nidn_dosen' => $request->nidn_dosen,
            'gender' => $request->gender,
            'status_dosen' => $request->status_dosen,
        ];

        $dosen = Dosen::findOrFail($id);
        $dosen->update($data);
        return to_route('dosen')->with('success', 'Dosen updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dosen $dosen)
    {
        $dosen->delete();

        return to_route('dosen')->with('success', 'Dosen deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:dosens,id_dosen',
        ]);
        $ids = $request->input('ids');
        Dosen::whereIn('id_dosen', $ids)->delete();

        return to_route('dosen')->with('success', 'Selected dosens deleted successfully');
    }
}
