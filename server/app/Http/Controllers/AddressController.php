<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Http\Requests\CreateAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Address::query();

        if ($request->has('postal_code')) {
            $query->where('postal_code', 'like', '%' . $request->get('postal_code') . '%');
        }

        if ($request->has('neighborhood')) {
            $query->where('neighborhood', 'like', '%' . $request->get('neighborhood') . '%');
        }

        $addresses = $query->paginate(15);

        return response()->json([
            'data' => $addresses->items(),
            'pagination' => [
                'current_page' => $addresses->currentPage(),
                'last_page' => $addresses->lastPage(),
                'per_page' => $addresses->perPage(),
                'total' => $addresses->total(),
            ]
        ]);
    }

    public function store(CreateAddressRequest $request): JsonResponse
    {
        $address = Address::create($request->validated());

        return response()->json([
            'message' => 'Address created successfully',
            'data' => $address->toArray()
        ], 201);
    }

    public function show(Address $address): JsonResponse
    {
        $address->load(['customer', 'orders']);

        return response()->json([
            'data' => $address->toArray()
        ]);
    }

    public function update(UpdateAddressRequest $request, Address $address): JsonResponse
    {
        $address->update($request->validated());

        return response()->json([
            'message' => 'Address updated successfully',
            'data' => $address->toArray()
        ]);
    }

    public function destroy(Address $address): JsonResponse
    {
        if ($address->orders()->count() > 0) {
            return response()->json([
                'message' => 'Não é possível excluir o endereço pois existem pedidos associados a ele.'
            ], 422);
        }

        $address->delete();

        return response()->json([
            'message' => 'Address deleted successfully'
        ]);
    }
}
