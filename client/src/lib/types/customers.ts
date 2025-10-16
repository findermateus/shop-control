export interface CustomerAddress {
  id: number
  postal_code: string
  street: string
  neighborhood: string
  number: string
  complement?: string
  customer_id?: number
  created_at?: string
  updated_at?: string
}

export interface Customer {
  id: number
  name: string
  email: string
  cellphone: string
  oauth_provider?: string
  oauth_provider_id?: string
  created_at: string
  updated_at: string
  addresses: CustomerAddress[]
}

export interface CustomerResponse {
  data: Customer[]
}

export interface SingleCustomerResponse {
  data: Customer
}

export interface CustomerStats {
  totalCustomers: number
  newCustomers: number 
}


export interface CreateCustomerData {
  name: string
  email: string
  cellphone: string
  oauth_provider: string
}

export interface CreateAddressData {
  postal_code: string
  street: string
  neighborhood: string
  number: string
  complement?: string
}
