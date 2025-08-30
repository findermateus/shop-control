<?php

namespace App\Exceptions;

class ProductNotFoundException extends ApplicationException
{
    public function __construct()
    {
        parent::__construct("Product not found", 404);
    }
}
