import { getAuthorizationToken } from "./auth.server";
import { Product } from "./types/stock";
import { getServerUrl } from "./utils";

export async function fetchProducts(): Promise<Array<Product>> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + '/products';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const data = await response.json();
            console.error('Error fetching products:', data.message || 'Erro ao buscar produtos');
            throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function createProduct(label: string, description: string, category: string, price: number): Promise<Product | null> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + '/products';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ label, description, category, price }),
        });
        if (!response.ok) {
            const data = await response.json();
            console.error('Error creating product:', data.message || 'Erro ao criar produto');
            throw new Error('Erro ao criar produto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function enableProduct(id: number | string) {
    const token = await getAuthorizationToken();
    try {
        const result = await fetch(`${getServerUrl()}/products/${id}/enable`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!result.ok) {
            throw new Error('Failed to enable product');
        }
        return await result.json();
    } catch (error) {
        console.error('Error enabling product:', error);
        throw new Error('Failed to enable product');
    }
}

export async function disableProduct(id: number | string) {
    const token = await getAuthorizationToken();
    try {
        const result = await fetch(`${getServerUrl()}/products/${id}/disable`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!result.ok) {
            throw new Error('Failed to disable product');
        }

        return await result.json();
    } catch (error) {
        console.error('Error disabling product:', error);
        throw new Error('Failed to disable product');
    }
}