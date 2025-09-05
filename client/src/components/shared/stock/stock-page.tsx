"use client";

import ManagerPageTitle from "@/components/shared/manager-page-title";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import StockDashboard from "./stock-dashboard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StockProductsTable from "./stock-products-table";

interface StockPageProps {
    readonly products: Array<any>;
}

export default function StockPage(props: StockPageProps) {
    const { products } = props;
    const categories = [
        { value: "Accessories", label: "Acessórios" },
        { value: "CardGame", label: "Jogos de carta" },
        { value: "Collectibles", label: "Colecionáveis" },
        { value: "Decoration", label: "Decoração" },
        { value: "Stationery", label: "Papelaria" },
        { value: "Clothing", label: "Roupas" },
    ];

    const productCount = products.length;
    const lowOnStockCount = products.filter((p) => p.stock < 5).length;
    const outOfStockCount = products.filter((p) => p.stock === 0).length;
    const totalValue = products.reduce((acc, product) => {
        return acc + product.price * product.stock;
    }, 0);
    return (
        <div>
            <ManagerPageTitle
                title="Estoque"
                description="Controle total dos seus produtos Esquina Geek"
            />
            <StockDashboard
                totalProducts={productCount}
                lowStockProducts={lowOnStockCount}
                outOfStockProducts={outOfStockCount}
                totalValue={totalValue}
            />
            <Card className="mt-8 p-5">
                <div className="flex flex-col gap-5">
                    <FilterTitle />
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome ou ID"
                                value={""}
                                onChange={(e) => 1}
                                className="pl-10"
                            />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Ativo</SelectItem>
                                <SelectItem value="inactive">
                                    Inativo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <StockProductsTable
                    products={products}
                    categories={categories}
                />
            </Card>
        </div>
    );
}

const FilterTitle = () => {
    return (
        <div className="flex gap-2">
            <Filter />
            <b>Filtros</b>
        </div>
    );
};
