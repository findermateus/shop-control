import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {Product, StockHistory} from "@/lib/types/stock";
import {Package} from "lucide-react";
import {useState} from "react";

interface StockHistoryDialog {
    readonly product: Product;
}

export default function StockHistoryDialog(props: StockHistoryDialog) {
    const product = props.product;
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const isClothing = product.category === 'Clothing';

    const getStockHistory = (): StockHistory[] => {
        if (isClothing && product.clothesVariants) {
            if (selectedSize) {
                const variant = product.clothesVariants.find(v => v.size === selectedSize);
                return variant?.stockHistories ? variant.stockHistories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
            }
            return [];
        }
        return product.stockHistories ? product.stockHistories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
    };

    const stockHistory = getStockHistory();

    return (
        <Modal
            trigger={
                <Button variant="outline">
                    <Package/>
                </Button>
            }
            title={`Histórico do estoque - ${product.label}`}
            dialogContent={
                <div className="space-y-4">
                    {isClothing && product.clothesVariants && (
                        <div className="space-y-2">
                            <span className="text-sm font-medium text-muted-foreground">Selecione o tamanho:</span>
                            <div className="flex flex-wrap gap-2">
                                {product.clothesVariants.map((variant) => (
                                    <Button
                                        key={variant.size}
                                        variant={selectedSize === variant.size ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedSize(variant.size)}
                                        className="min-w-[60px]"
                                    >
                                        {variant.size}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {(!isClothing || selectedSize) && (
                        <div className="space-y-3">
                            {stockHistory.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">
                                    Nenhum histórico de estoque encontrado
                                </div>
                            ) : (
                                stockHistory.map((stock, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-card"
                                    >
                                        <div className="flex flex-col gap-1 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-muted-foreground">Estoque:</span>
                                                <span className="font-semibold">{Number(stock.stock)}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-muted-foreground">Alteração:</span>
                                                <span
                                                    className={`font-semibold ${
                                                        Number(stock.quantityChanged) < 0
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                  {Number(stock.quantityChanged)}
                </span>
                                            </div>
                                        </div>

                                        <div className="text-right space-y-1 min-w-[180px]">
                                            <div className="text-xs text-muted-foreground">{stock.date}</div>
                                            <div className="text-xs text-muted-foreground italic">
                                                {stock.justification}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {isClothing && !selectedSize && (
                        <div className="text-center text-muted-foreground py-8">
                            Selecione um tamanho para visualizar o histórico
                        </div>
                    )}
                </div>
            }
        />
    )
}