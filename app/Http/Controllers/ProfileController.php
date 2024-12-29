<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\DosenResource;
use App\Http\Resources\MhsResource;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $id_user = auth()->user()->id;
        $id_user_in_dosen = Dosen::select('user_id')->get()->pluck('user_id')->toArray();
        $id_user_in_mahasiswa = Mahasiswa::select('user_id')->get()->pluck('user_id')->toArray();

        if (in_array($id_user, $id_user_in_dosen)) {
            $data_user = DosenResource::collection(Dosen::where('user_id', $id_user)->get());
        } elseif (in_array($id_user, $id_user_in_mahasiswa)) {
            $data_user = MhsResource::collection(Mahasiswa::where('user_id', $id_user)->with('r_kelas.r_prodi')->get());
        } else {
            $data_user = null;
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'data_user' => $data_user,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
