import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { formatCurrency } from "@/hooks/use-currency";
import { Product } from "@/lib/types/stock";
import { ChartNoAxesCombined } from "lucide-react";

interface StockPriceHistoryDialog {
    readonly product: Product;
}

export default function StockPriceHistoryDialog(props: StockPriceHistoryDialog) {
    const product = props.product;
    const priceHistories = product.priceHistories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (
        <Modal trigger={<Button variant="outline"><ChartNoAxesCombined /></Button>}
            title={`Histórico de preços - ${product.label}`}
            dialogContent={
                priceHistories.map((price, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {formatCurrency(Number(price.price))}
                                </span>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {price.date}
                        </div>
                    </div>
                ))
            }
        />
    )
}