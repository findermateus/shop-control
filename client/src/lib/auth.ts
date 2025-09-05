import { getServerUrl } from "./utils";

interface AuthResponse {
    message?: string;
    token?: string;
    success: boolean;
}

export async function authenticateManager(login: string, password: string): Promise<AuthResponse> {
    const url = getServerUrl() + '/auth';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, message: data.message || 'Could not authenticate' };
        }

        const data = await response.json();
        return { success: true, token: data.token };
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false, message: 'Could not authenticate'
        }
    }
}

export async function verifyToken(token: string): Promise<boolean> {
    const url = getServerUrl() + '/user';
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
            return false;
        }

        return response.status === 200;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}