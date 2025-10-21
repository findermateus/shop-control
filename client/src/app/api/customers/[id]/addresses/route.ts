import { createCustomerAddress } from '@/lib/customers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const body = await request.json()
    const { postal_code, street, neighborhood, number, complement } = body

    if (!postal_code || !street || !neighborhood || !number) {
      return NextResponse.json(
        { error: 'CEP, rua, bairro e número são obrigatórios' },
        { status: 422 }
      )
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID do cliente é obrigatório' },
        { status: 422 }
      )
    }

    const addressData = {
      postal_code,
      street,
      neighborhood,
      number,
      complement: complement || undefined // Opcional
    }
    
    const address = await createCustomerAddress(id, addressData)
    
    if (!address) {
      return NextResponse.json(
        { error: 'Erro ao criar endereço' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: address }, { status: 201 })
  } catch (error) {
    console.error('Error creating address:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}