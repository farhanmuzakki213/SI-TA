<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $role = Role::all();
        $users = User::with('roles')->get();
        $userRoles = $users->pluck('name', 'name')->all();
        return Inertia::render('main/superadmin/user/user', [
            'data_userRoles' => $userRoles ,
            'data_user' => $users,
            'rolesOptions' => $role->map(fn($u) => [
                'label' => $u->name,
                'value' => $u->name
            ])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        dd($request->all());
        $validator = Validator::make($request->all(), [
            'name' => 'required|exists:users,name',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'roles' => 'required|array',
        ]);

        // dd($validator);
        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $user = User::findOrFail($id);
            $data = [
                'name' => $request->name,
                'email' => $request->email,
            ];
            if (!empty($request->password)) {
                $data['password'] = Hash::make($request->password);
            }
            $user->update($data);
            $user->syncRoles($request->roles);
            DB::commit();

            return to_route('user')->with('success', 'Dosen created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('user')->with('error', 'Failed to update user: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
