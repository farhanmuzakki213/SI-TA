<?php

namespace App\Exceptions;

use Exception;

class UnauthorizedRoleException extends Exception
{
    public function __construct($message = 'Anda tidak memiliki hak akses', $code = 403)
    {
        parent::__construct($message, $code);
    }
}
