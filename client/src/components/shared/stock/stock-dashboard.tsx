import { AlertTriangle, CircleDollarSign, Package } from "lucide-react";
import StockInfoCard from "./stock-info-card";
import {formatCurrency} from "@/hooks/use-currency";

interface StockDashboardProps {
    readonly totalProducts?: number;
    readonly lowStockProducts?: number;
    readonly outOfStockProducts?: number;
    readonly totalValue?: number;
}

export default function StockDashboard(props: StockDashboardProps) {
    const {
        totalProducts = 0,
        lowStockProducts = 0,
        outOfStockProducts = 0,
        totalValue = 0,
    } = props;
    return (
        <section className="flex w-full gap-4">
            <StockInfoCard
                title="Total de Produtos"
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
                value={totalProducts}
            />
            <StockInfoCard
                title="Valor Total"
                icon={<CircleDollarSign className="h-4 w-4 text-green-600" />}
                value={formatCurrency(totalValue)}
                valueColor="text-green-600"
            />
            <StockInfoCard
                title="Estoque Baixo"
                icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
                value={lowStockProducts}
                valueColor="text-yellow-600"
            />
            <StockInfoCard
                title="Sem Estoque"
                icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                value={outOfStockProducts}
                valueColor="text-red-600"
            />
        </section>
    );
}
