export interface CustomerAddress {
    id: number;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    cpf?: string;
    birthDate?: string;
    gender?: 'male' | 'female' | 'other' | 'not_informed';
    status: 'active' | 'inactive' | 'blocked';
    addresses: CustomerAddress[];
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate?: string;
    createdAt: string;
    updatedAt: string;
    notes?: string;
}

export interface CustomerStats {
    totalCustomers: number;
    activeCustomers: number;
    inactiveCustomers: number;
    blockedCustomers: number;
    newCustomersThisMonth: number;
    totalRevenue: number;
    averageCustomerValue: number;
    repeatCustomers: number;
}
