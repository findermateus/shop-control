"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, MapPin, Package } from "lucide-react";
import { Customer } from "@/lib/types/customers";

interface CustomersTableProps {
    readonly customers: Customer[];
}

export default function CustomersTable(props: CustomersTableProps) {
    const { customers } = props;

    const getAvatarColor = (name: string) => {
        const colors = [
            'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 
            'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getStatusBadge = (customer: Customer) => {
        // Clientes VIP (mais de 10 pedidos)
        if (customer.totalOrders > 10) {
            return (
                <Badge className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                    VIP
                </Badge>
            );
        }
        
        // Clientes novos (criados nos últimos 30 dias)
        const createdDate = new Date(customer.createdAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        if (createdDate > thirtyDaysAgo) {
            return (
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    Novo
                </Badge>
            );
        }

        const statusConfig = {
            active: { label: "Ativo", color: "bg-green-100 text-green-700 text-xs px-2 py-1" },
            inactive: { label: "Inativo", color: "bg-orange-100 text-orange-700 text-xs px-2 py-1" },
            blocked: { label: "Bloqueado", color: "bg-red-100 text-red-700 text-xs px-2 py-1" },
        };

        const config = statusConfig[customer.status];
        return (
            <Badge className={`${config.color} rounded-full`}>
                {config.label}
            </Badge>
        );
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    const handleViewCustomer = (customerId: number) => {
        console.log('Ver cliente:', customerId);
        // Implementar navegação ou modal para detalhes do cliente
    };

    const handleEditCustomer = (customerId: number) => {
        console.log('Editar cliente:', customerId);
        // Implementar edição do cliente
    };

    const handleDeleteCustomer = (customerId: number) => {
        console.log('Excluir cliente:', customerId);
        // Implementar exclusão do cliente
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="border-b">
                        <TableHead className="text-left font-medium text-gray-600">Cliente</TableHead>
                        <TableHead className="text-left font-medium text-gray-600">Status</TableHead>
                        <TableHead className="text-left font-medium text-gray-600">Localização</TableHead>
                        <TableHead className="text-center font-medium text-gray-600">Pedidos</TableHead>
                        <TableHead className="text-center font-medium text-gray-600">Total Gasto</TableHead>
                        <TableHead className="text-center font-medium text-gray-600">Último Pedido</TableHead>
                        <TableHead className="text-center font-medium text-gray-600">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                Nenhum cliente encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        customers.map((customer) => (
                            <TableRow key={customer.id} className="hover:bg-gray-50">
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 ${getAvatarColor(customer.name)} rounded-full flex items-center justify-center`}>
                                            <span className="text-sm font-semibold text-white">
                                                {customer.name.split(' ').map(n => n[0]).join('').slice(0, 1).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{customer.name}</div>
                                            <div className="text-sm text-gray-500">{customer.email}</div>
                                            {customer.phone && (
                                                <div className="text-sm text-gray-500">{customer.phone}</div>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(customer)}</TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        {customer.addresses[0] ? `${customer.addresses[0].city}, ${customer.addresses[0].state}` : 'Não informado'}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="font-medium flex items-center justify-center gap-1">
                                        <Package className="h-4 w-4 text-gray-400" />
                                        {customer.totalOrders} pedidos
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="font-medium">{formatCurrency(customer.totalSpent)}</div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="text-sm">
                                        {customer.lastOrderDate ? formatDate(customer.lastOrderDate) : 'Nunca'}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewCustomer(customer.id)}
                                            title="Ver detalhes"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditCustomer(customer.id)}
                                            title="Editar cliente"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteCustomer(customer.id)}
                                            title="Excluir cliente"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}