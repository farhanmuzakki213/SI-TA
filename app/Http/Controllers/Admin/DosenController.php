<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DosenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_dosen = Dosen::with('r_user', 'r_prodi')
            ->orderByDesc('id_dosen')
            ->get();

        $prodi = Prodi::all();
        $users = User::all();
        // dd($data_dosen->toArray(), $prodi->toArray(), $users->toArray());
        return Inertia::render('main/admin/dosen/dosen', [
            'data_dosen' => $data_dosen,
            'prodiOptions' => $prodi->map(fn($p) => [
                'label' => $p->nama_prodi,
                'value' => $p->id_prodi
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
        // dd($request->toArray());
        $validator = Validator::make($request->all(), [
            'id_dosen' => 'required',
            'user_id' => 'required|exists:users,id',
            'prodi_id' => 'required|exists:prodis,id_prodi',
            'nama_dosen' => 'required|string',
            'nidn_dosen' => 'required|string',
            'gender' => 'required|string',
            'status_dosen' => 'required|string',
        ]);

        // dd($validator);
        if ($validator->fails()) {
            return redirect()->back()->withInput()->withErrors($validator);
        }
        $data = [
            'id_dosen' => $request->id_dosen,
            'user_id' => $request->user_id,
            'prodi_id' => $request->prodi_id,
            'nama_dosen' => $request->nama_dosen,
            'nidn_dosen' => $request->nidn_dosen,
            'gender' => $request->gender,
            'status_dosen' => $request->status_dosen,
        ];

        $dosen = Dosen::create($data);

        return back()->with('success', 'Dosen created successfully');
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
            'nama_dosen' => 'required|string',
            'nidn_dosen' => 'required|string',
            'gender' => 'required|string',
            'status_dosen' => 'required|string',
        ]);

        // dd($validator);
        if ($validator->fails()) {
            return redirect()->back()->withInput()->withErrors($validator);
        }
        $data = [
            'user_id' => $request->user_id,
            'prodi_id' => $request->prodi_id,
            'nama_dosen' => $request->nama_dosen,
            'nidn_dosen' => $request->nidn_dosen,
            'gender' => $request->gender,
            'status_dosen' => $request->status_dosen,
        ];

        $dosen = Dosen::findOrFail($id);
        $dosen->update($data);
        return back()->with('success', 'Dosen updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dosen $dosen)
    {
        $dosen->delete();

        return back()->with('success', 'Dosen deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:dosens,id_dosen',
        ]);
        $ids = $request->input('ids');
        Dosen::whereIn('id_dosen', $ids)->delete();

        return back()->with('success', 'Dosen deleted successfully');
    }
}
