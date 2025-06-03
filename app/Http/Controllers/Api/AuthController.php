<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ApiException;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\UnauthorizedRoleException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\MobileLoginRequest;
use App\Http\Resources\UserAuthResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function login(MobileLoginRequest $request)
    {
        // dd($request->all());
        $credentials = $request->only('email', 'password');


        if (!Auth::attempt($credentials)) {
            throw new InvalidCredentialsException('Email atau password salah', 401);
        }

        $user = User::with('roles')
            ->where('email', $request->email)
            ->firstOrFail();

        // Authorization check via Policy
        if (!$user->can('loginAsPimpinanProdi')) {
            throw new UnauthorizedRoleException('Anda tidak memiliki hak akses sebagai Pimpinan Prodi', 403);
        }

        $token = $user->createToken('mobile-pimpinanProdi-token')->plainTextToken;

        return response()->json([
            'data' => new UserAuthResource($user),
            'meta' => [
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    public function logout(Request $request)
    {
        try {
            // Validasi user terautentikasi
            if (!$request->user()) {
                throw new ApiException('Unauthenticated', 401);
            }

            // Revoke current token
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logout berhasil',
                'meta' => [
                    'status' => 'success',
                    'code' => 200,
                ],
            ]);
        } catch (\Exception $e) {

            throw new ApiException(
                'Gagal logout',
                500,
                config('app.debug') ? $e->getMessage() : null
            );
        }
    }
}
