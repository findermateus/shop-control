import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Product } from "@/lib/types/stock";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface StockUpdateProductProps {
    product: Product;
}

export default function StockUpdateProduct(props: StockUpdateProductProps) {
    const { product } = props;
    return (
        <Modal
            trigger={
                <Button variant="outline">
                    <SquarePen />
                </Button>
            }
            dialogContent={
                <UpdateProductContent
                    productId={product.id}
                    label={product.label}
                    description={product.description}
                    price={product.price}
                />
            }
            title="Alterar Produto"
        />
    );
}

interface UpdateProductContentProps {
    productId: number;
    label?: string;
    description?: string;
    price?: number;
}

const UpdateProductContent = (props: UpdateProductContentProps) => {
    const { productId, label, description, price } = props;
    const [newLabel, setNewLabel] = useState(label || "");
    const [newDescription, setNewDescription] = useState(description || "");
    const [newPrice, setNewPrice] = useState(price || 0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const priceIsDifferent = Number(price) !== Number(newPrice);
    const labelIsDifferent = label !== newLabel;
    const descriptionIsDifferent = description !== newDescription;
    const hasChanges =
        labelIsDifferent || descriptionIsDifferent || priceIsDifferent;

    const handleUpdateProduct = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: newLabel.trim(),
                    description: newDescription.trim(),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao atualizar produto");
            }

            toast.success("Produto atualizado com sucesso!");

            router.refresh();
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePrice = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/products/${productId}/price`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    price: newPrice,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao atualizar preço");
            }

            toast.success("Preço atualizado com sucesso!");

            router.refresh();
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid w-full items-center gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
                type="text"
                id="name"
                placeholder="Nome"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                disabled={isLoading}
            />
            <Label htmlFor="description">Descrição</Label>
            <Input
                type="text"
                id="description"
                placeholder="Descrição"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                disabled={isLoading}
            />
            <Label htmlFor="price">Preço</Label>
            <div className="flex gap-2 w-full">
                <Input
                    type="number"
                    id="price"
                    placeholder="Preço"
                    min={1}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    disabled={isLoading}
                />
                <Button
                    onClick={handleUpdatePrice}
                    disabled={!priceIsDifferent || isLoading}
                    className="whitespace-nowrap"
                >
                    {isLoading ? "Salvando..." : "Salvar Preço"}
                </Button>
            </div>
            <div className="flex gap-2 w-full mt-4">
                <Button
                    onClick={handleUpdateProduct}
                    disabled={!hasChanges || isLoading}
                    className="w-full"
                >
                    {isLoading ? "Atualizando..." : "Atualizar Produto"}
                </Button>
            </div>
        </div>
    );
};
