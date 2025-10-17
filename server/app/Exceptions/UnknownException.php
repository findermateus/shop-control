<?php

namespace App\Exceptions;

use Illuminate\Http\Request;

class UnknownException extends \Exception
{
    public function __construct(string $message = "", int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request)
    {
        return response([
            'message' => $this->message
        ], $this->code);
    }
}
