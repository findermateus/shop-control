<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Customer::with(['addresses']);

        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->get('email') . '%');
        }

        if ($request->has('oauth_provider')) {
            $query->where('oauth_provider', $request->get('oauth_provider'));
        }

        $customers = $query->paginate(15);

        return response()->json([
            ...$customers->items(),
            'pagination' => [
                'current_page' => $customers->currentPage(),
                'last_page' => $customers->lastPage(),
                'per_page' => $customers->perPage(),
                'total' => $customers->total(),
            ]
        ]);
    }

    public function store(CreateCustomerRequest $request): JsonResponse
    {
        $customer = Customer::create($request->validated());

        $customer->load('addresses');

        return response()->json([
            ...$customer->toArray()
        ], 201);
    }

    public function show(Customer $customer): JsonResponse
    {
        $customer->load(['addresses', 'orders']);

        return response()->json($customer->toArray());
    }

    public function update(UpdateCustomerRequest $request, Customer $customer): JsonResponse
    {
        $customer->update($request->validated());

        $customer->load('addresses');

        return response()->json($customer->toArray());
    }

    public function destroy(Customer $customer): JsonResponse
    {
        $customer->orders()->delete();
        $customer->addresses()->delete();
        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully'
        ]);
    }

    public function createAddress(Customer $customer, Request $request): JsonResponse
    {
        $request->validate([
            'postal_code' => ['required', 'string', 'max:20', 'regex:/^\d{5}-?\d{3}$/'],
            'street' => ['required', 'string', 'min:1', 'max:255'],
            'neighborhood' => ['required', 'string', 'min:1', 'max:255'],
            'number' => ['required', 'string', 'max:20'],
            'complement' => ['nullable', 'string', 'max:255']
        ]);

        $address = $customer->addresses()->create($request->all());

        return response()->json([
            'message' => 'Address created successfully for customer',
            'data' => $address->toArray()
        ], 201);
    }
}
