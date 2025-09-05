import { getAuthorizationToken } from "./auth.server";
import { getServerUrl } from "./utils";

export async function fetchProducts() {
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