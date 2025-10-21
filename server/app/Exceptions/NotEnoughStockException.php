<?php

namespace App\Exceptions;

class NotEnoughStockException extends ApplicationException
{
    public function __construct()
    {
        parent::__construct("Not enough stock", 404);
    }
}
