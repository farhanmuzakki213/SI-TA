<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaMhsApiResource;
use App\Models\TaMhs;
use Illuminate\Http\Request;

class TaMhsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $taMhs = TaMhs::with([
                    'r_mahasiswa',
                    'r_pembimbing_1',
                    'r_pembimbing_2',
                    'r_penguji_1',
                    'r_penguji_2',
                    'r_ketua',
                    'r_sekretaris'
                ])
                // Filter hanya data yang memiliki semua relasi
                ->complete()
                ->get();

            return TaMhsApiResource::collection($taMhs);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve data',
                'error' => $e->getMessage()
            ], 500);
        }
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
    public function show(string $id)
    {
        try {
            $taMhs = TaMhs::with([
                    'r_mahasiswa',
                    'r_pembimbing_1',
                    'r_pembimbing_2',
                    'r_penguji_1',
                    'r_penguji_2',
                    'r_ketua',
                    'r_sekretaris'
                ])
                // Filter hanya data yang memiliki semua relasi
                ->complete()
                ->findOrFail($id);

            return new TaMhsApiResource($taMhs);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data not found or incomplete'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
