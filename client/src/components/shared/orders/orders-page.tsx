"use client";

import ManagerPageTitle from "@/components/shared/manager-page-title";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Filter, Plus, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import OrdersTable from "./orders-table";
import {useEffect, useState} from "react";
import {ApiOrder} from "@/lib/types/orders";
import {Button} from "@/components/ui/button";
import OrderCreateDialog from "@/components/shared/orders/order-create-dialog";
import {getStoreName} from "@/lib/client-utils";

interface OrdersPageProps {
    readonly orders: Array<ApiOrder>;
}

export default function OrdersPage(props: OrdersPageProps) {
    const [filteredOrders, setFilteredOrders] = useState<ApiOrder[]>(props.orders);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("");

    useEffect(() => {
        let filtered = props.orders;

        setFilteredOrders(filtered);
    }, [searchTerm, selectedStatus, selectedPaymentStatus, props.orders]);

    const statusOptions = [
        {value: "pending", label: "Pendente"},
        {value: "confirmed", label: "Confirmado"},
        {value: "processing", label: "Processando"},
        {value: "shipped", label: "Enviado"},
        {value: "delivered", label: "Entregue"},
        {value: "cancelled", label: "Cancelado"},
    ];

    return (
        <div>
            <ManagerPageTitle
                title="Pedidos"
                description={`Gerencie todos os pedidos da ${getStoreName()}`}
            />
            <Card className="mt-8 p-5">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <FilterTitle/>
                        <OrderCreateDialog trigger={<Button><Plus/> Novo Pedido</Button>}/>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                            <Input
                                placeholder="Buscar por cliente, email ou ID do pedido"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select onValueChange={(value) => setSelectedStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status do Pedido"/>
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
                        <Select onValueChange={(value) => setSelectedPaymentStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status Pagamento"/>
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
                <div className="mt-6">
                    <OrdersTable orders={filteredOrders}/>
                </div>
            </Card>
        </div>
    );
}

const FilterTitle = () => {
    return (
        <div className="flex gap-2">
            <Filter/>
            <b>Filtros</b>
        </div>
    );
};