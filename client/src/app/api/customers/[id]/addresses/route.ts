import { createCustomerAddress } from '@/lib/customers'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: { id: string }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { postal_code, street, neighborhood, number, complement } = body

    if (!postal_code || !street || !neighborhood || !number) {
      return NextResponse.json(
        { error: 'CEP, rua, bairro e número são obrigatórios' },
        { status: 422 }
      )
    }

    const address = await createCustomerAddress(params.id, {
      postal_code,
      street,
      neighborhood,
      number,
      complement
    })
    
    if (!address) {
      return NextResponse.json(
        { error: 'Erro ao criar endereço' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Address created successfully for customer',
      data: address 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating address:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}