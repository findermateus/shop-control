import { Card } from "@/components/ui/card";

interface CustomerInfoCardProps {
    readonly title: string;
    readonly icon: React.ReactNode;
    readonly value: number | string;
    readonly valueColor?: string;
    readonly formatAsCurrency?: boolean;
    readonly subtitle?: string;
}

export default function CustomerInfoCard(props: CustomerInfoCardProps) {
    const { title, icon, value, valueColor = "text-foreground", formatAsCurrency = false, subtitle } = props;
    
    const formatValue = (val: number | string) => {
        // Verificação para undefined/null
        if (val === undefined || val === null) {
            return formatAsCurrency ? "R$ 0,00" : "0";
        }
        
        if (formatAsCurrency && typeof val === 'number') {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(val);
        }
        return val.toString();
    };

    return (
        <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">{title}</p>
                    <p className={`text-3xl font-bold ${valueColor}`}>
                        {formatValue(value)}
                    </p>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="ml-4">
                    {icon}
                </div>
            </div>
        </Card>
    );
}