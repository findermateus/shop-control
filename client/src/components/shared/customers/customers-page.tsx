"use client";

import ManagerPageTitle from "@/components/shared/manager-page-title";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import CustomerDashboard from "./customer-dashboard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CustomersTable from "./customers-table";
import { Customer, CustomerStats } from "@/lib/types/customers";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface CustomersPageProps {
    readonly customers: Array<Customer>;
    readonly stats: CustomerStats;
}

export default function CustomersPage(props: CustomersPageProps) {
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(props.customers);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedGender, setSelectedGender] = useState<string>("");

    useEffect(() => {
        let filtered = props.customers;
        
        if (searchTerm) {
            filtered = filtered.filter((customer) =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.id.toString() === searchTerm ||
                (customer.cpf && customer.cpf.includes(searchTerm))
            );
        }
        
        if (selectedStatus) {
            filtered = filtered.filter((customer) => customer.status === selectedStatus);
        }
        
        if (selectedGender) {
            filtered = filtered.filter((customer) => customer.gender === selectedGender);
        }
        
        setFilteredCustomers(filtered);
    }, [searchTerm, selectedStatus, selectedGender, props.customers]);

    const statusOptions = [
        { value: "active", label: "Ativo" },
        { value: "inactive", label: "Inativo" },
        { value: "blocked", label: "Bloqueado" },
    ];

    const genderOptions = [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Feminino" },
        { value: "other", label: "Outro" },
        { value: "not_informed", label: "Não informado" },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h1>
                <p className="text-gray-600">Gerencie todos os clientes da Esquina Geek</p>
            </div>
            <CustomerDashboard stats={props.stats} />
            <Card className="mt-6 p-6">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">🔍</span>
                            <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
                        </div>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Cliente
                        </Button>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select onValueChange={(value) => setSelectedStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todos os Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setSelectedGender(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Gênero" />
                            </SelectTrigger>
                            <SelectContent>
                                {genderOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Lista de Clientes ({filteredCustomers.length})</h2>
                    <CustomersTable customers={filteredCustomers} />
                </div>
            </Card>
        </div>
    );
}
