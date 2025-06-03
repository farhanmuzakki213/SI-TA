<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ruangan_id' => 'required|exists:ruangan,id_ruangan',
            'sesi_id' => 'required|exists:sesi,id_sesi',
            'mahasiswa_id' => 'required|exists:mahasiswas,id_mahasiswa',
            'tipe' => 'required|in:1,2,3',
            'tgl_booking' => 'required|date',
            'status_booking' => 'sometimes|in:0,1,2',
        ];
    }
}
