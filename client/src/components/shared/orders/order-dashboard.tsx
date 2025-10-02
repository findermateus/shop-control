import { 
    Package, 
    Clock, 
    Truck, 
    CheckCircle, 
    XCircle, 
    CircleDollarSign,
    TrendingUp
} from "lucide-react";
import OrderInfoCard from "./order-info-card";
import { OrderStats } from "@/lib/types/orders";

interface OrderDashboardProps {
    readonly stats: OrderStats;
}

export default function OrderDashboard(props: OrderDashboardProps) {
    const { stats } = props;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <OrderInfoCard
                title="Total de Pedidos"
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
                value={stats.totalOrders}
            />
            <OrderInfoCard
                title="Pendentes"
                icon={<Clock className="h-4 w-4 text-orange-500" />}
                value={stats.pendingOrders}
                valueColor="text-orange-600"
            />
            <OrderInfoCard
                title="Em Processamento"
                icon={<Package className="h-4 w-4 text-blue-500" />}
                value={stats.processingOrders}
                valueColor="text-blue-600"
            />
            <OrderInfoCard
                title="Enviados"
                icon={<Truck className="h-4 w-4 text-purple-500" />}
                value={stats.shippedOrders}
                valueColor="text-purple-600"
            />
            <OrderInfoCard
                title="Entregues"
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                value={stats.deliveredOrders}
                valueColor="text-green-600"
            />
            <OrderInfoCard
                title="Cancelados"
                icon={<XCircle className="h-4 w-4 text-red-500" />}
                value={stats.cancelledOrders}
                valueColor="text-red-600"
            />
            <OrderInfoCard
                title="Receita Total"
                icon={<CircleDollarSign className="h-4 w-4 text-green-600" />}
                value={stats.totalRevenue}
                valueColor="text-green-600"
                formatAsCurrency={true}
            />
            <OrderInfoCard
                title="Valor Médio por Pedido"
                icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
                value={stats.averageOrderValue}
                valueColor="text-blue-600"
                formatAsCurrency={true}
            />
        </section>
    );
}