<?php

namespace App\Exceptions;

use Exception;

class ApiException extends Exception
{
    protected $debug;

    public function __construct(
        string $message = '',
        int $code = 400,
        $debug = null
    ) {
        parent::__construct($message, $code);
        $this->debug = $debug;
    }

    public function render()
    {
        $response = [
            'error' => [
                'message' => $this->getMessage(),
                'code' => $this->getCode(),
            ]
        ];

        if (config('app.debug')) {
            $response['error']['debug'] = $this->debug;
        }

        return response()->json($response, $this->getCode());
    }
}
