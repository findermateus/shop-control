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
import { Eye, Truck, CheckCircle, XCircle } from "lucide-react";
import {ApiOrder} from "@/lib/types/orders";
import {formatCurrency} from "@/hooks/use-currency";

interface OrdersTableProps {
    readonly orders: ApiOrder[];
}

export default function OrdersTable(props: OrdersTableProps) {
    const { orders } = props;

    const getStatusBadge = (status: ApiOrder['status']) => {
        const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive"; color: string }> = {
            pending: { label: "Pendente", variant: "secondary", color: "bg-orange-100 text-orange-800" },
            processing: { label: "Processando", variant: "default", color: "bg-blue-100 text-blue-800" },
            shipped: { label: "Enviado", variant: "default", color: "bg-purple-100 text-purple-800" },
            delivered: { label: "Entregue", variant: "default", color: "bg-green-100 text-green-800" },
            cancelled: { label: "Cancelado", variant: "destructive", color: "bg-red-100 text-red-800" },
        };

        const config = statusConfig[status] ?? statusConfig["pending"];

        return (
            <Badge className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date(dateString));
        } catch (e) {
            return dateString;
        }
    };

    const handleViewOrder = (orderId: number) => {
        console.log('Ver pedido:', orderId);
    };

    const handleUpdateStatus = (orderId: number, newStatus: ApiOrder['status']) => {
        console.log('Atualizar status do pedido:', orderId, 'para:', newStatus);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Itens</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                Nenhum pedido encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.order_code}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.customer?.name ?? 'Cliente não informado'}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {order.customer?.email ?? ''}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                <TableCell className="font-medium">
                                    {formatCurrency(Number(order.total_amount))}
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {order.order_items?.length ?? 0} {((order.order_items?.length ?? 0) === 1 ? 'item' : 'itens')}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {formatDate(order.created_at)}
                                </TableCell>
                                <TableCell className="flex justify-center">
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewOrder(order.id)}
                                            title="Ver detalhes"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {order.status === 'pending' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(order.id, 'processing')}
                                                title="Aprovar pedido"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {order.status === 'processing' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(order.id, 'shipped')}
                                                title="Marcar como enviado"
                                            >
                                                <Truck className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {(order.status === 'pending' || order.status === 'processing') && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                                                title="Cancelar pedido"
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        )}
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