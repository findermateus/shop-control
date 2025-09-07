import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Product } from "@/lib/types/stock";
import { SquarePen } from "lucide-react";
import { useState } from "react";

interface StockUpdateProductProps {
    product: Product;
}

export default function StockUpdateProduct(props: StockUpdateProductProps) {
    const { product } = props;
    return <Modal
        trigger={<Button variant="outline"><SquarePen /></Button>}
        dialogContent={<UpdateProductContent label={product.label} description={product.description} price={product.price} />}
        title="Alterar Produto"
    />;
}

interface UpdateProductContentProps {
    label?: string;
    description?: string;
    price?: number;
}

const UpdateProductContent = (props: UpdateProductContentProps) => {
    const { label, description, price } = props;
    const [newLabel, setNewLabel] = useState(label || "");
    const [newDescription, setNewDescription] = useState(description || "");
    const [newPrice, setNewPrice] = useState(price || 0);
    const priceIsDifferent = Number(price) !== Number(newPrice);

    return <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="name">Nome</Label>
        <Input type="text" id="name" placeholder="Nome" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
        <Label htmlFor="description">Descrição</Label>
        <Input type="text" id="description" placeholder="Descrição" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <Label htmlFor="price">Preço</Label>
        <div className="flex gap-2 w-full">
            <Input type="number" id="price" placeholder="Preço" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} />
            <Button disabled={!priceIsDifferent} className="whitespace-nowrap">Salvar Preço</Button>
        </div>
    </div>
}