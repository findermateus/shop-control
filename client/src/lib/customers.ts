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
        
        const customers: Customer[] = [];
        
        for (const key in result) {
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

export async function createCustomer(
    customerData: CreateCustomerData
): Promise<Customer | null> {
    try {
        const token = await getAuthorizationToken();
        
        if (!token) {
            console.error("Token de autenticação não encontrado");
            return null;
        }
        
        const url = getServerUrl() + "/customers";
        
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
            const errorText = await response.text();
            console.error("Erro ao criar cliente:", errorText);
            return null;
        }

        const result = await response.json();

        if (result && result.id) {
            return result as Customer;
        } else {
            console.error("Resposta inválida do servidor");
            return null;
        }
        
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        return null;
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

export async function updateCustomer(
    id: number | string,
    customerData: CreateCustomerData
): Promise<Customer | null> {
    try {
        const token = await getAuthorizationToken();
        
        if (!token) {
            console.error("Token de autenticação não encontrado");
            return null;
        }
        
        const url = getServerUrl() + `/customers/${id}`;
        
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
            const errorText = await response.text();
            console.error("Erro ao atualizar cliente:", errorText);
            return null;
        }

        const result = await response.json();

        if (result && result.id) {
            return result as Customer;
        } else {
            console.error("Resposta inválida do servidor");
            return null;
        }
        
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
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
    try {
        const token = await getAuthorizationToken();
        
        if (!token) {
            console.error("Token de autenticação não encontrado");
            return null;
        }
        
        const url = getServerUrl() + `/customers/${customerId}/addresses`;
        
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
            const errorText = await response.text();
            console.error("Erro ao criar endereço:", errorText);
            return null;
        }

        const result = await response.json();

        if (result && (result.id || result.data)) {
            return result.data || result;
        } else {
            console.error("Resposta inválida do servidor");
            return null;
        }
        
    } catch (error) {
        console.error("Erro ao criar endereço:", error);
        return null;
    }
}

export async function updateCustomerAddress(
    addressId: number | string,
    addressData: CreateAddressData
): Promise<any | null> {
    try {
        const token = await getAuthorizationToken();
        
        if (!token) {
            console.error("Token de autenticação não encontrado");
            return null;
        }
        
        const url = getServerUrl() + `/addresses/${addressId}`;
        
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao atualizar endereço:", errorText);
            return null;
        }

        const result = await response.json();
        
        if (result && (result.id || result.data)) {
            return result.data || result;
        } else {
            console.error("Resposta inválida do servidor");
            return null;
        }
        
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        return null;
    }
}

export async function deleteCustomerAddress(addressId: number | string): Promise<boolean | string> {
    try {
        const token = await getAuthorizationToken();
        
        if (!token) {
            console.error("Token de autenticação não encontrado");
            return false;
        }
        
        const url = getServerUrl() + `/addresses/${addressId}`;
        
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorText = errorData.message || "Erro ao excluir endereço";
            console.error("Erro ao excluir endereço:", errorText);
            return errorText;
        }

        return true;
        
    } catch (error) {
        console.error("Erro ao excluir endereço:", error);
        return false;
    }
}

