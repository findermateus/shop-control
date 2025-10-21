import { updateCustomer, deleteCustomer } from '@/lib/customers'
import { UpdateCustomerData } from '@/lib/types/customers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const body = await request.json()
    const { name, email, cellphone } = body

    if (!name || !email || !cellphone) {
      return NextResponse.json(
        { error: 'Nome, email e telefone são obrigatórios' },
        { status: 422 }
      )
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID do cliente é obrigatório' },
        { status: 422 }
      )
    }

    const customerData: UpdateCustomerData = {
      name,
      email,
      cellphone
    }
    
    const customer = await updateCustomer(id, customerData as any)
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Erro ao atualizar cliente' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: customer })
  } catch (error) {
    console.error('Error updating customer:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const success = await deleteCustomer(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao excluir cliente' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}