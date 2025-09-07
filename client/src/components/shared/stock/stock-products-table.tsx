import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/hooks/use-currency";
import StockPriceHistoryDialog from "./stock-price-history-dialog";
import { Product } from "@/lib/types/stock";
import StockUpdateProduct from "./stock-update-product";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

interface StockProductsTableProps {
    readonly products: Array<Product>;
    readonly categories: Array<{ value: string; label: string }>;
}

export default function StockProductsTable(props: StockProductsTableProps) {
    const { products, categories } = props;

    const getCategoryLabel = (value: string) => {
        const category = categories.find((cat) => cat.value === value);
        return category ? category.label : value;
    };

    return (
        <Table>
            <TableCaption>Lista de produtos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-center">Preços</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">
                            {product.id}
                        </TableCell>
                        <TableCell>{product.label}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                            {getCategoryLabel(product.category)}
                        </TableCell>
                        <TableCell>
                            <StockBadge stock={getStock(product)} />
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={"secondary"}
                                className={
                                    product.active
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }
                            >
                                {product.active ? "Ativo" : "Inativo"}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {formatCurrency(Number(product.price))}
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <StockPriceHistoryDialog product={product} />
                        </TableCell>
                        <TableCell>
                            <StockUpdateProduct product={product} />
                            <Button variant="outline" title={product.active ? "Inativar" : "Ativar"}>
                                <Power color={product.active ? "red" : "green"} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
}

const getStock = (product: any) => {
    if (product.category === "Clothing") {
        return product.clothesVariants.reduce(
            (sum: any, variant: any) => sum + variant.stock,
            0
        );
    }
    return product.stock;
}

const StockBadge = ({ stock }: { stock: number }) => {
    const getBadgeColor = () => {
        if (stock === 0) return "bg-red-100 text-red-800";
        if (stock < 5) return "bg-yellow-100 text-yellow-800";
        return "bg-green-100 text-green-800";
    };

    return (
        <Badge className={`${getBadgeColor()}`}>
            {stock === 0 ? "Sem estoque" : `Em estoque: ${stock}`}
        </Badge>
    );
};
