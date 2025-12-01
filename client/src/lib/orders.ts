import {getAuthorizationToken} from "@/lib/auth.server";
import {getServerUrl} from "@/lib/utils";
import {ApiOrder} from "@/lib/types/orders";

interface CreateOrderProduct {
    product_id: number;
    clothes_variant_id: number | null;
    quantity: number;
}

interface CreateOrderPayload {
    customer_id: number;
    address_id: number;
    products: CreateOrderProduct[];
}

export async function createOrder(payload: CreateOrderPayload): Promise<{ success: boolean; message?: string; order?: ApiOrder }> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + "/orders";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Error creating order:",
                data.message || "Erro ao criar pedido"
            );
            return {
                success: false,
                message: data.message || "Erro ao criar pedido"
            };
        }

        return {
            success: true,
            order: data,
            message: "Pedido criado com sucesso!"
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false,
            message: "Erro ao conectar com o servidor"
        };
    }
}

export async function getOrders(): Promise<ApiOrder[]> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + "/orders";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const data = await response.json();
            console.error(
                "Error fetching orders:",
                data.message || "Erro ao buscar pedidos"
            );
            throw new Error(data.message || "Erro ao buscar pedidos");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}