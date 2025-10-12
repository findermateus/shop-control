"use client";

import { useState, useEffect } from "react";
import { Customer, CustomerStats } from "@/lib/types/customers";
import CustomerDashboard from "./customer-dashboard";
import CustomersTable from "./customers-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [stats, setStats] = useState<CustomerStats>({
        totalCustomers: 0,
        newCustomers: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomersData();
    }, []);

    const calculateStats = (customersList: Customer[]): CustomerStats => {
        if (!customersList || !Array.isArray(customersList)) {
            return {
                totalCustomers: 0,
                newCustomers: 0,
            };
        }

        const now = new Date();
        // Pegar o primeiro dia do mês atual
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // Clientes novos no mês atual (não mais nos últimos 30 dias)
        const newCustomers = customersList.filter((customer) => {
            if (!customer.created_at) return false;
            const createdAt = new Date(customer.created_at);
            return createdAt >= currentMonthStart;
        }).length;

        return {
            totalCustomers: customersList.length,
            newCustomers: newCustomers,
        };
    };

    const fetchCustomersData = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/customers");

            if (!response.ok) {
                throw new Error("Erro ao buscar clientes");
            }

            const data = await response.json();
            const customersData = data.data || [];

            setCustomers(customersData);
            setStats(calculateStats(customersData));
        } catch (error) {
            console.error("Erro ao carregar clientes:", error);
            toast.error("Erro ao carregar clientes");

            setStats({
                totalCustomers: 0,
                newCustomers: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
                <p className="mt-2 text-gray-600">
                    Gerencie todos os clientes da Esquina Geek
                </p>
            </div>

            {/* Dashboard */}
            <CustomerDashboard stats={stats} />

            {/* Filtros */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg font-medium text-gray-900">
                            Filtros
                        </h3>
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Cliente
                    </Button>
                </div>

                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Lista de clientes */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                    Lista de Clientes ({customers.length})
                </h3>

                <CustomersTable
                    customers={customers}
                    searchTerm={searchTerm}
                    onCustomerUpdated={fetchCustomersData}
                />
            </div>
        </div>
    );
}
