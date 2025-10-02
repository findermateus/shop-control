import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">{title}</h3>
                {icon}
            </div>
            <div className={`text-3xl font-bold ${valueColor} mb-1`}>
                {formatValue(value)}
            </div>
            {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
            )}
        </Card>
    );
}