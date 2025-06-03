<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function loginAsPimpinanProdi(User $user)
    {
        // Return response langsung untuk debugging
    if (!$user->roles) {
        return Response::deny('User has no roles assigned');
    }

    return $user->roles->contains('name', 'pimpinanProdi')
        ? Response::allow()
        : Response::deny('Anda bukan Pimpinan Prodi');
    }
}
