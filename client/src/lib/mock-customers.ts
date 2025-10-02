import { Customer } from "@/lib/types/customers";

export const mockCustomers: Customer[] = [
    {
        id: 1,
        name: "Ana Silva Santos",
        email: "ana.silva@email.com",
        phone: "(11) 99999-1234",
        cpf: "123.456.789-01",
        birthDate: "1990-05-15",
        gender: "female",
        status: "active",
        addresses: [
            {
                id: 1,
                street: "Rua das Flores",
                number: "123",
                complement: "Apt 45",
                neighborhood: "Centro",
                city: "São Paulo",
                state: "SP",
                zipCode: "01234-567",
                isDefault: true
            }
        ],
        totalOrders: 8,
        totalSpent: 1247.80,
        averageOrderValue: 155.98,
        lastOrderDate: "2025-09-18T14:30:00Z",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-09-18T14:30:00Z",
        notes: "Cliente VIP - sempre compra produtos anime"
    },
    {
        id: 2,
        name: "Carlos Oliveira",
        email: "carlos.oliveira@email.com",
        phone: "(21) 88888-5678",
        cpf: "987.654.321-02",
        birthDate: "1985-12-03",
        gender: "male",
        status: "active",
        addresses: [
            {
                id: 2,
                street: "Avenida Atlântica",
                number: "456",
                neighborhood: "Copacabana",
                city: "Rio de Janeiro",
                state: "RJ",
                zipCode: "22070-001",
                isDefault: true
            }
        ],
        totalOrders: 15,
        totalSpent: 2890.45,
        averageOrderValue: 192.70,
        lastOrderDate: "2025-09-19T09:20:00Z",
        createdAt: "2024-11-20T15:30:00Z",
        updatedAt: "2025-09-19T09:20:00Z"
    },
    {
        id: 3,
        name: "Maria Santos Costa",
        email: "maria.santos@email.com",
        phone: "(31) 77777-9012",
        cpf: "456.789.123-03",
        birthDate: "1992-08-22",
        gender: "female",
        status: "active",
        addresses: [
            {
                id: 3,
                street: "Rua da Liberdade",
                number: "789",
                neighborhood: "Liberdade",
                city: "São Paulo",
                state: "SP",
                zipCode: "01503-001",
                isDefault: true
            },
            {
                id: 4,
                street: "Rua dos Inconfidentes",
                number: "321",
                neighborhood: "Centro",
                city: "Belo Horizonte",
                state: "MG",
                zipCode: "30112-000",
                isDefault: false
            }
        ],
        totalOrders: 3,
        totalSpent: 387.60,
        averageOrderValue: 129.20,
        lastOrderDate: "2025-09-10T16:45:00Z",
        createdAt: "2025-08-01T11:15:00Z",
        updatedAt: "2025-09-10T16:45:00Z"
    },
    {
        id: 4,
        name: "João Pereira Lima",
        email: "joao.pereira@email.com",
        phone: "(85) 66666-3456",
        birthDate: "1988-03-10",
        gender: "male",
        status: "inactive",
        addresses: [
            {
                id: 5,
                street: "Avenida Beira Mar",
                number: "987",
                neighborhood: "Meireles",
                city: "Fortaleza",
                state: "CE",
                zipCode: "60165-121",
                isDefault: true
            }
        ],
        totalOrders: 15,
        totalSpent: 3200.00,
        averageOrderValue: 213.33,
        lastOrderDate: "2025-09-30T13:20:00Z",
        createdAt: "2024-05-10T09:00:00Z",
        updatedAt: "2025-06-15T13:20:00Z",
        notes: "Cliente inativo há 3 meses"
    },
    {
        id: 5,
        name: "Fernanda Costa Silva",
        email: "fernanda.costa@email.com",
        phone: "(47) 55555-7890",
        cpf: "789.123.456-05",
        birthDate: "1995-11-07",
        gender: "female",
        status: "blocked",
        addresses: [
            {
                id: 6,
                street: "Rua do Comércio",
                number: "654",
                neighborhood: "Centro",
                city: "Curitiba",
                state: "PR",
                zipCode: "80020-000",
                isDefault: true
            }
        ],
        totalOrders: 1,
        totalSpent: 0,
        averageOrderValue: 0,
        lastOrderDate: "2025-08-20T10:30:00Z",
        createdAt: "2025-08-15T14:45:00Z",
        updatedAt: "2025-08-25T16:20:00Z",
        notes: "Bloqueado por chargeback"
    },
    {
        id: 6,
        name: "Roberto Lima Santos",
        email: "roberto.lima@email.com",
        phone: "(62) 44444-1122",
        cpf: "321.654.987-06",
        birthDate: "1983-07-25",
        gender: "male",
        status: "active",
        addresses: [
            {
                id: 7,
                street: "Rua T-23",
                number: "159",
                complement: "Casa 2",
                neighborhood: "Setor Bueno",
                city: "Goiânia",
                state: "GO",
                zipCode: "74210-030",
                isDefault: true
            }
        ],
        totalOrders: 12,
        totalSpent: 2156.90,
        averageOrderValue: 179.74,
        lastOrderDate: "2025-09-15T11:10:00Z",
        createdAt: "2024-12-08T08:30:00Z",
        updatedAt: "2025-09-15T11:10:00Z"
    },
    {
        id: 7,
        name: "Patricia Souza",
        email: "patricia.souza@email.com",
        phone: "(51) 33333-4455",
        birthDate: "1991-02-18",
        gender: "female",
        status: "active",
        addresses: [
            {
                id: 8,
                street: "Avenida Ipiranga",
                number: "852",
                neighborhood: "Centro Histórico",
                city: "Porto Alegre",
                state: "RS",
                zipCode: "90160-093",
                isDefault: true
            }
        ],
        totalOrders: 2,
        totalSpent: 340.00,
        averageOrderValue: 170.00,
        lastOrderDate: "2025-10-01T15:25:00Z",
        createdAt: "2025-09-15T12:00:00Z",
        updatedAt: "2025-09-12T15:25:00Z"
    },
    {
        id: 8,
        name: "Diego Rodrigues",
        email: "diego.rodrigues@email.com",
        phone: "(41) 22222-6677",
        cpf: "654.321.987-08",
        birthDate: "1987-09-14",
        gender: "male",
        status: "active",
        addresses: [
            {
                id: 9,
                street: "Rua XV de Novembro",
                number: "741",
                neighborhood: "Centro",
                city: "Curitiba",
                state: "PR",
                zipCode: "80020-310",
                isDefault: true
            }
        ],
        totalOrders: 4,
        totalSpent: 687.20,
        averageOrderValue: 171.80,
        lastOrderDate: "2025-09-08T17:45:00Z",
        createdAt: "2025-07-05T10:20:00Z",
        updatedAt: "2025-09-08T17:45:00Z"
    }
];

export function getMockCustomerStats() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const newCustomersThisMonth = mockCustomers.filter(customer => {
        const createdDate = new Date(customer.createdAt);
        return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
    }).length;
    
    const activeCustomers = mockCustomers.filter(customer => customer.status === 'active');
    const totalRevenue = mockCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const repeatCustomers = mockCustomers.filter(customer => customer.totalOrders > 1).length;
    
    const stats = {
        totalCustomers: mockCustomers.length,
        activeCustomers: activeCustomers.length,
        inactiveCustomers: mockCustomers.filter(customer => customer.status === 'inactive').length,
        blockedCustomers: mockCustomers.filter(customer => customer.status === 'blocked').length,
        newCustomersThisMonth,
        totalRevenue,
        averageCustomerValue: totalRevenue / mockCustomers.length || 0,
        repeatCustomers
    };
    
    return stats;
}
