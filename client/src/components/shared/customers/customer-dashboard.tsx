import { CustomerStats } from "@/lib/types/customers";
import CustomerInfoCard from "./customer-info-card";
import { Users, UserPlus } from "lucide-react";

interface CustomerDashboardProps {
    readonly stats: CustomerStats;
}

export default function CustomerDashboard(props: CustomerDashboardProps) {
    const { stats } = props;

    // Calcular quantos clientes novos tivemos nesta semana
    const getWeeklySubtitle = () => {
        if (stats.newCustomers === 0) {
            return "Nenhum novo esta semana";
        } else if (stats.newCustomers === 1) {
            return "+1 novo esta semana";
        } else {
            return `+${stats.newCustomers} novos esta semana`;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerInfoCard
                title="Total de Clientes"
                icon={<Users className="h-8 w-8 text-muted-foreground" />}
                value={stats.totalCustomers}
                subtitle={getWeeklySubtitle()}
            />
            
            <CustomerInfoCard
                title="Novos Clientes"
                icon={<UserPlus className="h-8 w-8 text-primary" />}
                value={stats.newCustomers}
                valueColor="text-primary"
                subtitle="Este mês"
            />
        </div>
    );
}