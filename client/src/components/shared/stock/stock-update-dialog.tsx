"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/types/stock";
import { Package, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

interface StockUpdateDialogProps {
    readonly product: Product;
    readonly onStockUpdated?: () => void;
}

export default function StockUpdateDialog({ product, onStockUpdated }: StockUpdateDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [stockChange, setStockChange] = useState<number>(0);

    const isClothing = product.category === 'Clothing';

    const getCurrentStock = () => {
        if (isClothing && product.clothesVariants) {
            if (selectedSize) {
                const variant = product.clothesVariants.find(v => v.size === selectedSize);
                return variant?.stock || 0;
            }
            return 0;
        }
        return product.stock || 0;
    };

    const handleSubmit = async () => {
        if (stockChange === 0) {
            toast.error("A alteração deve ser diferente de zero");
            return;
        }

        if (isClothing && !selectedSize) {
            toast.error("Selecione um tamanho");
            return;
        }

        setIsLoading(true);

        try {
            const body = {
                quantityChanged: stockChange,
                ...(isClothing && selectedSize ? { size: selectedSize } : {})
            };

            const response = await fetch(`/api/products/${product.id}/stock`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar estoque');
            }

            toast.success("Estoque atualizado com sucesso!");
            setStockChange(0);
            setSelectedSize(null);
            onStockUpdated?.();
        } catch (error) {
            toast.error("Erro ao atualizar estoque");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const newStock = getCurrentStock() + stockChange;

    return (
        <Modal
            trigger={
                <Button variant="outline" size="sm">
                    <Package />
                </Button>
            }
            title={`Alterar Estoque - ${product.label}`}
            dialogContent={
                <div className="space-y-4">
                    {isClothing && product.clothesVariants && (
                        <div className="space-y-2">
                            <Label>Selecione o tamanho:</Label>
                            <div className="flex flex-wrap gap-2">
                                {product.clothesVariants.map((variant) => (
                                    <Button
                                        key={variant.size}
                                        variant={selectedSize === variant.size ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedSize(variant.size)}
                                        className="min-w-[60px]"
                                    >
                                        {variant.size} (Estoque: {variant.stock})
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {(!isClothing || selectedSize) && (
                        <>
                            <div className="space-y-2">
                                <Label>Estoque atual: {getCurrentStock()}</Label>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stockChange">Alteração no estoque:</Label>
                                <Input
                                    id="stockChange"
                                    type="number"
                                    value={stockChange}
                                    onChange={(e) => setStockChange(Number(e.target.value))}
                                    placeholder="Digite a quantidade (positiva para adicionar, negativa para remover)"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Novo estoque: {newStock}
                                    {newStock < 0 && (
                                        <span className="text-red-500 ml-2 flex items-center gap-1">
                                            <TriangleAlert className="h-4 w-4" />
                                            Estoque ficará negativo!
                                        </span>
                                    )}
                                </p>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading || stockChange === 0}
                                    className="flex-1"
                                >
                                    {isLoading ? "Atualizando..." : "Atualizar Estoque"}
                                </Button>
                            </div>
                        </>
                    )}

                    {isClothing && !selectedSize && (
                        <div className="text-center text-muted-foreground py-8">
                            Selecione um tamanho para alterar o estoque
                        </div>
                    )}
                </div>
            }
        />
    );
}
