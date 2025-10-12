import { getAuthorizationToken } from "./auth.server";
import { 
  Customer, 
  CustomerResponse, 
  SingleCustomerResponse, 
  CreateCustomerData,
  CreateAddressData 
} from "./types/customers";
import { getServerUrl } from "./utils";

export async function fetchCustomers(): Promise<Customer[]> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + "/customers";
    
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
            const errorText = await response.text();
            let data;
            try {
                data = JSON.parse(errorText);
            } catch (parseError) {
                data = { message: errorText };
            }
            
            console.error(
                "Error fetching customers:",
                data.message || "Erro ao buscar clientes"
            );
            throw new Error(data.message || "Erro ao buscar clientes");
        }

        const responseText = await response.text();
        const result = JSON.parse(responseText);
        
        // Converter o formato da API Laravel para array
        const customers: Customer[] = [];
        
        // Percorrer as chaves numéricas
        for (const key in result) {
            // Pular a chave 'pagination'
            if (key !== 'pagination' && !isNaN(Number(key))) {
                customers.push(result[key]);
            }
        }
        
        return customers;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export async function fetchCustomer(id: number | string): Promise<Customer | null> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + `/customers/${id}`;
    
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
                "Error fetching customer:",
                data.message || "Erro ao buscar cliente"
            );
            throw new Error("Erro ao buscar cliente");
        }

        const result: SingleCustomerResponse = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function createCustomer(
    customerData: CreateCustomerData
): Promise<Customer | null> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + "/customers";
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(customerData),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(
                "Error creating customer:",
                data.message || "Erro ao criar cliente"
            );
            throw new Error("Erro ao criar cliente");
        }

        const result: SingleCustomerResponse = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function updateCustomer(
    id: number | string,
    customerData: CreateCustomerData
): Promise<Customer | null> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + `/customers/${id}`;
    
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(customerData),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(
                "Error updating customer:",
                data.message || "Erro ao atualizar cliente"
            );
            throw new Error("Erro ao atualizar cliente");
        }

        const result: SingleCustomerResponse = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function deleteCustomer(id: number | string): Promise<boolean> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + `/customers/${id}`;
    
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(
                "Error deleting customer:",
                data.message || "Erro ao excluir cliente"
            );
            throw new Error("Erro ao excluir cliente");
        }

        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

export async function createCustomerAddress(
    customerId: number | string,
    addressData: CreateAddressData
): Promise<any | null> {
    const token = await getAuthorizationToken();
    const url = getServerUrl() + `/customers/${customerId}/addresses`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(
                "Error creating address:",
                data.message || "Erro ao criar endereço"
            );
            throw new Error("Erro ao criar endereço");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}