export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    productImage?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    variant?: string;
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

export interface ApiProduct {
    id: number;
    label: string;
}

export interface ApiOrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: string;
    total_price: string;
    product?: ApiProduct | null;
}

export interface ApiCustomer {
    id: number;
    name: string;
    email: string;
}

export interface ApiOrder {
    id: number;
    order_code?: string;
    customer_id?: number;
    customer?: ApiCustomer | null;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
    total_amount: string;
    created_at: string;
    order_items: ApiOrderItem[];
}