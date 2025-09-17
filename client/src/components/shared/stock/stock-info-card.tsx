import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockInfoCardProps {
    readonly title: string;
    readonly icon: React.ReactNode;
    readonly value: string | number;
    readonly valueColor?: string;
}

export default function StockInfoCard(props: StockInfoCardProps) {
    const { title, icon, value, valueColor } = props;
    return (
        <Card className="p-4 flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div
                    className={`text-2xl font-bold ${
                        valueColor || "text-foreground"
                    }`}
                >
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}
