<?php

namespace App\Http\Controllers\Api;

use App\Helpers\CariNomor;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class BookingControler extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Booking::with(['r_mahasiswa', 'r_ruangan', 'r_sesi']);

        // Add filters if needed
        if ($request->has('ruangan_id')) {
            $query->where('ruangan_id', $request->ruangan_id);
        }

        if ($request->has('tgl_booking')) {
            $query->where('tgl_booking', $request->tgl_booking);
        }

        if ($request->has('status_booking')) {
            $query->where('status_booking', $request->status_booking);
        }

        return BookingResource::collection($query->paginate());
    }

    public function store(BookingRequest $request): JsonResponse
    {
        $id_booking = CariNomor::getCariNomor(Booking::class, 'id_booking');

        $bookingData = $request->validated();
        $bookingData['id_booking'] = $id_booking;

        $booking = Booking::create($bookingData);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => new BookingResource($booking->load(['r_mahasiswa', 'r_ruangan', 'r_sesi']))
        ], Response::HTTP_CREATED);
    }

    public function show(Booking $booking): BookingResource
    {
        return new BookingResource($booking->load(['r_mahasiswa', 'r_ruangan', 'r_sesi']));
    }

    public function update(BookingRequest $request, Booking $booking): JsonResponse
    {
        $booking->update($request->validated());

        return response()->json([
            'message' => 'Booking updated successfully',
            'data' => new BookingResource($booking->load(['r_mahasiswa', 'r_ruangan', 'r_sesi']))
        ]);
    }

    public function destroy(Booking $booking): JsonResponse
    {
        $booking->delete();

        return response()->json([
            'message' => 'Booking deleted successfully'
        ], Response::HTTP_NO_CONTENT);
    }
}
