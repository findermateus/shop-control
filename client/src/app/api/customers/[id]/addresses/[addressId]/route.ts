import { updateCustomerAddress, deleteCustomerAddress } from '@/lib/customers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string; addressId: string }> }
) {
  try {
    const { addressId } = await context.params;
    
    const body = await request.json()
    const { postal_code, street, neighborhood, number, complement } = body

    if (!postal_code || !street || !neighborhood || !number) {
      return NextResponse.json(
        { error: 'CEP, rua, bairro e número são obrigatórios' },
        { status: 422 }
      )
    }

    if (!addressId) {
      return NextResponse.json(
        { error: 'ID do endereço é obrigatório' },
        { status: 422 }
      )
    }

    const addressData = {
      postal_code,
      street,
      neighborhood,
      number,
      complement: complement || undefined
    }
    
    const address = await updateCustomerAddress(addressId, addressData)
    
    if (!address) {
      return NextResponse.json(
        { error: 'Erro ao atualizar endereço' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: address })
  } catch (error) {
    console.error('Error updating address:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; addressId: string }> }
) {
  try {
    const { addressId } = await context.params;
    
    if (!addressId) {
      return NextResponse.json(
        { error: 'ID do endereço é obrigatório' },
        { status: 422 }
      )
    }

    const success = await deleteCustomerAddress(addressId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao excluir endereço' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting address:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}