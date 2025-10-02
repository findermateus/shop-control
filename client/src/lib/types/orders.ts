export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    productImage?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    variant?: string; // Para roupas que podem ter tamanhos/cores
}

export interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    shippingAddress: {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
    createdAt: string;
    updatedAt: string;
    notes?: string;
}

export interface OrderStats {
    totalOrders: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
}