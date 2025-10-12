import { fetchCustomers, createCustomer } from '@/lib/customers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {    
    const customers = await fetchCustomers()
    return NextResponse.json({ data: customers })
  } catch (error) {
    console.error('Error in customers API:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar clientes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, cellphone } = body

    if (!name || !email || !cellphone) {
      return NextResponse.json(
        { error: 'Nome, email e telefone são obrigatórios' },
        { status: 422 }
      )
    }

    const customer = await createCustomer({ name, email, cellphone })
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Erro ao criar cliente' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: customer }, { status: 201 })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}