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
        <Card className="p-6 bg-card border border-border shadow-sm rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">{title}</p>
                    <p className={`text-3xl font-bold ${valueColor}`}>
                        {formatValue(value)}
                    </p>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="ml-4">
                    {icon}
                </div>
            </div>
        </Card>
    );
}