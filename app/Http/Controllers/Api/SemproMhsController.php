<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SemproMhsApiResource;
use App\Models\SemproMhs;
use Illuminate\Http\Request;

class SemproMhsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $semproMhs = SemproMhs::with([
                'r_mahasiswa',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji'
            ])
                ->complete()
                ->get();

            return SemproMhsApiResource::collection($semproMhs);
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
            $semproMhs = SemproMhs::with([
                'r_mahasiswa',
                'r_pembimbing_1',
                'r_pembimbing_2',
                'r_penguji'
            ])
                ->complete()
                ->findOrFail($id);

            return new SemproMhsApiResource($semproMhs);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data not found'
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
