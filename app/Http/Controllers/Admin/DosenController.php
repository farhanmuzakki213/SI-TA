<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
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
        // dd($data_dosen->toArray());
        return Inertia::render('main/admin/dosen', [
            'data_dosen' => $data_dosen,
            'prodiOptions' => $prodi->map(fn($p) => ['label' => $p->nama_prodi, 'value' => $p->id]),
            'userOptions' => $users->map(fn($u) => ['label' => $u->name, 'value' => $u->id])
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
        //
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
    public function update(Request $request, Dosen $dosen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dosen $dosen)
    {
        //
    }
}
