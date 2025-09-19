import { Order } from "@/lib/types/orders";

export const mockOrders: Order[] = [
    {
        id: 1001,
        customerName: "Ana Silva",
        customerEmail: "ana.silva@email.com",
        customerPhone: "(11) 99999-1234",
        status: "pending",
        items: [
            {
                id: 1,
                productId: 101,
                productName: "Camiseta Pokemon Pikachu",
                quantity: 2,
                unitPrice: 49.90,
                totalPrice: 99.80,
                variant: "M"
            },
            {
                id: 2,
                productId: 102,
                productName: "Caneca Dragon Ball Z",
                quantity: 1,
                unitPrice: 29.90,
                totalPrice: 29.90
            }
        ],
        subtotal: 129.70,
        shipping: 15.00,
        total: 144.70,
        paymentMethod: "pix",
        paymentStatus: "pending",
        shippingAddress: {
            street: "Rua das Flores",
            number: "123",
            complement: "Apt 45",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            zipCode: "01234-567"
        },
        createdAt: "2025-09-19T10:30:00Z",
        updatedAt: "2025-09-19T10:30:00Z",
        notes: "Cliente solicitou entrega urgente"
    },
    {
        id: 1002,
        customerName: "Carlos Oliveira",
        customerEmail: "carlos.oliveira@email.com",
        customerPhone: "(21) 88888-5678",
        status: "processing",
        items: [
            {
                id: 3,
                productId: 103,
                productName: "Action Figure Naruto",
                quantity: 1,
                unitPrice: 89.90,
                totalPrice: 89.90
            }
        ],
        subtotal: 89.90,
        shipping: 12.00,
        total: 101.90,
        paymentMethod: "credit_card",
        paymentStatus: "paid",
        shippingAddress: {
            street: "Avenida Atlântica",
            number: "456",
            neighborhood: "Copacabana",
            city: "Rio de Janeiro",
            state: "RJ",
            zipCode: "22070-001"
        },
        createdAt: "2025-09-18T14:15:00Z",
        updatedAt: "2025-09-19T09:20:00Z"
    },
    {
        id: 1003,
        customerName: "Maria Santos",
        customerEmail: "maria.santos@email.com",
        status: "shipped",
        items: [
            {
                id: 4,
                productId: 104,
                productName: "Poster Attack on Titan",
                quantity: 3,
                unitPrice: 19.90,
                totalPrice: 59.70
            },
            {
                id: 5,
                productId: 105,
                productName: "Chaveiro One Piece",
                quantity: 2,
                unitPrice: 14.90,
                totalPrice: 29.80
            }
        ],
        subtotal: 89.50,
        shipping: 10.00,
        total: 99.50,
        paymentMethod: "debit_card",
        paymentStatus: "paid",
        shippingAddress: {
            street: "Rua da Liberdade",
            number: "789",
            neighborhood: "Liberdade",
            city: "São Paulo",
            state: "SP",
            zipCode: "01503-001"
        },
        createdAt: "2025-09-17T16:45:00Z",
        updatedAt: "2025-09-18T11:30:00Z",
        notes: "Código de rastreamento: BR123456789"
    },
    {
        id: 1004,
        customerName: "João Pereira",
        customerEmail: "joao.pereira@email.com",
        customerPhone: "(31) 77777-9012",
        status: "delivered",
        items: [
            {
                id: 6,
                productId: 106,
                productName: "Deck Pokemon TCG",
                quantity: 1,
                unitPrice: 159.90,
                totalPrice: 159.90
            }
        ],
        subtotal: 159.90,
        shipping: 18.00,
        total: 177.90,
        paymentMethod: "credit_card",
        paymentStatus: "paid",
        shippingAddress: {
            street: "Rua dos Inconfidentes",
            number: "321",
            neighborhood: "Centro",
            city: "Belo Horizonte",
            state: "MG",
            zipCode: "30112-000"
        },
        createdAt: "2025-09-15T09:20:00Z",
        updatedAt: "2025-09-18T14:15:00Z"
    },
    {
        id: 1005,
        customerName: "Fernanda Costa",
        customerEmail: "fernanda.costa@email.com",
        status: "cancelled",
        items: [
            {
                id: 7,
                productId: 107,
                productName: "Moletom Anime Studio Ghibli",
                quantity: 1,
                unitPrice: 89.90,
                totalPrice: 89.90,
                variant: "G"
            }
        ],
        subtotal: 89.90,
        shipping: 15.00,
        total: 104.90,
        paymentMethod: "pix",
        paymentStatus: "refunded",
        shippingAddress: {
            street: "Rua do Comércio",
            number: "654",
            neighborhood: "Centro",
            city: "Curitiba",
            state: "PR",
            zipCode: "80020-000"
        },
        createdAt: "2025-09-16T13:10:00Z",
        updatedAt: "2025-09-17T10:05:00Z",
        notes: "Cancelado a pedido do cliente"
    },
    {
        id: 1006,
        customerName: "Roberto Lima",
        customerEmail: "roberto.lima@email.com",
        customerPhone: "(85) 66666-3456",
        status: "processing",
        items: [
            {
                id: 8,
                productId: 108,
                productName: "Figura Colecionável Dragon Ball",
                quantity: 2,
                unitPrice: 129.90,
                totalPrice: 259.80
            },
            {
                id: 9,
                productId: 109,
                productName: "Almofada Totoro",
                quantity: 1,
                unitPrice: 39.90,
                totalPrice: 39.90
            }
        ],
        subtotal: 299.70,
        shipping: 20.00,
        total: 319.70,
        paymentMethod: "bank_transfer",
        paymentStatus: "paid",
        shippingAddress: {
            street: "Avenida Beira Mar",
            number: "987",
            neighborhood: "Meireles",
            city: "Fortaleza",
            state: "CE",
            zipCode: "60165-121"
        },
        createdAt: "2025-09-18T11:45:00Z",
        updatedAt: "2025-09-19T08:15:00Z"
    }
];

export function getMockOrderStats() {
    const stats = {
        totalOrders: mockOrders.length,
        pendingOrders: mockOrders.filter(order => order.status === 'pending').length,
        processingOrders: mockOrders.filter(order => order.status === 'processing').length,
        shippedOrders: mockOrders.filter(order => order.status === 'shipped').length,
        deliveredOrders: mockOrders.filter(order => order.status === 'delivered').length,
        cancelledOrders: mockOrders.filter(order => order.status === 'cancelled').length,
        totalRevenue: mockOrders
            .filter(order => order.paymentStatus === 'paid')
            .reduce((sum, order) => sum + order.total, 0),
        averageOrderValue: 0
    };
    
    stats.averageOrderValue = stats.totalRevenue / (stats.totalOrders - stats.cancelledOrders) || 0;
    
    return stats;
}