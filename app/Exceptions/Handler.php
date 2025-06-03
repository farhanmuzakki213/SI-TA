<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (ApiException $e, $request) {
            return response()->json([
                'error' => [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                ]
            ], $e->getCode());
        });

        $this->renderable(function (InvalidCredentialsException $e, $request) {
            return response()->json([
                'error' => [
                    'message' => $e->getMessage(),
                    'code' => 401,
                ]
            ], 401);
        });

        // Tambahkan handler untuk UnauthorizedRoleException
        $this->renderable(function (UnauthorizedRoleException $e, $request) {
            return response()->json([
                'error' => [
                    'message' => $e->getMessage(),
                    'code' => 403,
                ]
            ], 403);
        });
    }
}
