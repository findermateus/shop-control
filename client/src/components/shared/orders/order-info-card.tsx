import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderInfoCardProps {
    readonly title: string;
    readonly icon: React.ReactNode;
    readonly value: number | string;
    readonly valueColor?: string;
    readonly formatAsCurrency?: boolean;
}

export default function OrderInfoCard(props: OrderInfoCardProps) {
    const { title, icon, value, valueColor = "text-foreground", formatAsCurrency = false } = props;
    
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
        <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${valueColor}`}>
                    {formatValue(value)}
                </div>
            </CardContent>
        </Card>
    );
}