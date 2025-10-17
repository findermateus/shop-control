export interface ApiAddress {
    id: number;
    customer_id: number;
    postal_code: string;
    street: string;
    neighborhood: string;
    number: string;
    complement: string | null;
    created_at: string;
    updated_at: string;
}

export interface ApiCustomer {
    id: number;
    name: string;
    email: string;
    cellphone: string | null;
    oauth_provider: 'google' | 'facebook' | 'github';
    oauth_provider_id: string | null;
    created_at: string;
    updated_at: string;
    addresses: ApiAddress[];
}
