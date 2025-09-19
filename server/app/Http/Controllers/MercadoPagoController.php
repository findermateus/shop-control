<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MercadoPagoController extends Controller
{
    //
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoController extends Controller
{
    public function criarPagamento()
    {
        MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));
        
        $client = new PreferenceClient();
        $preference = $client->create([
            "items" => [
                [
                    "title" => "Produto Exemplo",
                    "quantity" => 1,
                    "unit_price" => 100.00,
                ]
            ],
            "back_urls" => [
                "success" => env('APP_URL') . "/pagamento/sucesso",
                "failure" => env('APP_URL') . "/pagamento/falha",
                "pending" => env('APP_URL') . "/pagamento/pendente",
            ],
            "auto_return" => "approved",
        ]);

        return response()->json(['preferenceId' => $preference->id]);
    }
}