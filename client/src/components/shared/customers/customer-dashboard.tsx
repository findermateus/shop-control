import { 
    Users,
    TrendingUp,
    UserPlus,
    CircleDollarSign
} from "lucide-react";
import CustomerInfoCard from "./customer-info-card";
import { CustomerStats } from "@/lib/types/customers";

interface CustomerDashboardProps {
    readonly stats: CustomerStats;
}

export default function CustomerDashboard(props: CustomerDashboardProps) {
    const { stats } = props;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <CustomerInfoCard
                title="Total de Clientes"
                icon={<Users className="h-5 w-5 text-gray-500" />}
                value={stats.totalCustomers}
                subtitle="+2 novos esta semana"
                valueColor="text-gray-900"
            />
            <CustomerInfoCard
                title="Clientes Ativos"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                value={stats.activeCustomers}
                subtitle={`${Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}% do total`}
                valueColor="text-green-600"
            />
            <CustomerInfoCard
                title="Novos Clientes"
                icon={<UserPlus className="h-5 w-5 text-blue-500" />}
                value={stats.newCustomersThisMonth}
                subtitle="Este mês"
                valueColor="text-blue-600"
            />
            <CustomerInfoCard
                title="Valor Total"
                icon={<CircleDollarSign className="h-5 w-5 text-green-500" />}
                value={stats.totalRevenue}
                subtitle="Receita total"
                valueColor="text-green-600"
                formatAsCurrency={true}
            />
        </section>
    );
}