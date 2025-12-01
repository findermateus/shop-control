import { NextRequest, NextResponse } from 'next/server';
import { getAuthorizationToken } from '@/lib/auth.server';
import { getServerUrl } from '@/lib/utils';

export async function POST(request: NextRequest) {
    try {
        const token = await getAuthorizationToken();

        if (!token) {
            return NextResponse.json(
                { message: 'Não autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();

        if (!body.customer_id || !body.address_id || !body.products || body.products.length === 0) {
            return NextResponse.json(
                { message: 'Campos obrigatórios faltando' },
                { status: 400 }
            );
        }

        const response = await fetch(`${getServerUrl()}/orders`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Erro ao criar pedido' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

