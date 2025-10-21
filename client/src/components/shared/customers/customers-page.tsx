"use client";

import { useState, useEffect } from "react";
import { Customer, CustomerStats } from "@/lib/types/customers";
import CustomerDashboard from "./customer-dashboard";
import CustomersTable from "./customers-table";
import CreateCustomerModal from "@/components/shared/customers/customer-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { toast } from "sonner";
import {useLoading} from "@/providers/LoadingProvider";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [stats, setStats] = useState<CustomerStats>({
        totalCustomers: 0,
        newCustomers: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const {setLoading} = useLoading();

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
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

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

    const handleCreateCustomer = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCustomerCreated = () => {
        fetchCustomersData();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
                <p className="mt-2 text-muted-foreground">
                    Gerencie todos os clientes da Esquina Geek
                </p>
            </div>

            <CustomerDashboard stats={stats} />

            <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-medium text-card-foreground">
                            Filtros
                        </h3>
                    </div>
                    <Button 
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleCreateCustomer}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Cliente
                    </Button>
                </div>

                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">
                    Lista de Clientes ({customers.length})
                </h3>

                <CustomersTable
                    customers={customers}
                    searchTerm={searchTerm}
                    onCustomerUpdated={fetchCustomersData}
                />
            </div>

            <CreateCustomerModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onCustomerCreated={handleCustomerCreated}
            />
        </div>
    );
}
