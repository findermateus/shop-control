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
import { Order } from "@/lib/types/orders";

interface OrdersTableProps {
    readonly orders: Order[];
}

export default function OrdersTable(props: OrdersTableProps) {
    const { orders } = props;

    const getStatusBadge = (status: Order['status']) => {
        const statusConfig = {
            pending: { label: "Pendente", variant: "secondary" as const, color: "bg-orange-100 text-orange-800" },
            processing: { label: "Processando", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
            shipped: { label: "Enviado", variant: "default" as const, color: "bg-purple-100 text-purple-800" },
            delivered: { label: "Entregue", variant: "default" as const, color: "bg-green-100 text-green-800" },
            cancelled: { label: "Cancelado", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
        };

        const config = statusConfig[status];
        return (
            <Badge className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
        const statusConfig = {
            pending: { label: "Pendente", color: "bg-orange-100 text-orange-800" },
            paid: { label: "Pago", color: "bg-green-100 text-green-800" },
            failed: { label: "Falhou", color: "bg-red-100 text-red-800" },
            refunded: { label: "Reembolsado", color: "bg-gray-100 text-gray-800" },
        };

        const config = statusConfig[status];
        return (
            <Badge className={config.color}>
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const handleViewOrder = (orderId: number) => {
        console.log('Ver pedido:', orderId);
        // Implementar navegação ou modal para detalhes do pedido
    };

    const handleUpdateStatus = (orderId: number, newStatus: Order['status']) => {
        console.log('Atualizar status do pedido:', orderId, 'para:', newStatus);
        // Implementar atualização de status
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Itens</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                Nenhum pedido encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">#{order.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.customerName}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {order.customerEmail}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                                <TableCell className="font-medium">
                                    {formatCurrency(order.total)}
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {formatDate(order.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
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