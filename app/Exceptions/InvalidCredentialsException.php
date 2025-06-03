<?php

namespace App\Exceptions;

use Exception;

class InvalidCredentialsException extends Exception
{
    public function __construct($message = 'Email atau password salah', $code = 401)
    {
        parent::__construct($message, $code);
    }
}
