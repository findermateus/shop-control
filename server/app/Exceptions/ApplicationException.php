<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ApplicationException extends Exception
{
    public function __construct(string $message = "", protected int $httpStatus = 400)
    {
        parent::__construct($message, 0);
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => $this->message
        ], $this->httpStatus);
    }
}
