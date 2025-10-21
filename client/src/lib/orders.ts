import {getAuthorizationToken} from "@/lib/auth.server";
import {getServerUrl} from "@/lib/utils";
import {ApiOrder} from "@/lib/types/orders";

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