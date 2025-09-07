import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoading } from "@/providers/LoadingProvider";
import { useState } from "react";
import { toast } from "sonner";

interface StockCreateProductProps {
    trigger: React.ReactNode;
}

export default function StockCreateProduct(props: StockCreateProductProps) {
    const { trigger } = props;
    return <Modal title="Criar Novo Produto" trigger={trigger} dialogContent={<DialogContent />} />;
}

const DialogContent = () => {
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0.0);
    const { setLoading } = useLoading();
    const options = [
        { value: "Accessories", label: "Acessórios" },
        { value: "CardGame", label: "Jogos de carta" },
        { value: "Collectibles", label: "Colecionáveis" },
        { value: "Decoration", label: "Decoração" },
        { value: "Stationery", label: "Papelaria" },
        { value: "Clothing", label: "Roupas" },
    ];

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ label, description, category, price }),
            });
            if (!response.ok) {
                toast.error('Erro ao criar produto');
                return;
            }
            toast.success('Produto criado com sucesso');
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar produto');
        } finally {
            setLoading(false);
        }
    }

    return <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="name">Nome do produto</Label>
        <Input type="text" id="name" placeholder="Nome do produto" value={label} onChange={(e) => setLabel(e.target.value)} />
        <Label htmlFor="description">Descrição</Label>
        <Input type="text" id="description" placeholder="Descrição do produto" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label htmlFor="price">Preço</Label>
        <Input type="number" id="price" placeholder="Preço" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <Label htmlFor="category">Categoria</Label>
        <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button onClick={handleSubmit} disabled={!label || !description || !category || !price} className="mt-4">Criar Produto</Button>
    </div>
}