"use client";

import ManagerPageTitle from "@/components/shared/manager-page-title";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import StockDashboard from "./stock-dashboard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StockProductsTable from "./stock-products-table";
import { Product } from "@/lib/types/stock";
import { useEffect, useState } from "react";
import StockCreateProduct from "./stock-create-product";
import { Button } from "@/components/ui/button";

interface StockPageProps {
    readonly products: Array<Product>;
}

export default function StockPage(props: StockPageProps) {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(props.products);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    useEffect(() => {
        let filtered = props.products;
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.label.toLowerCase().includes(searchTerm.toLowerCase())
                || product.id.toString() === searchTerm
                || product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }
        if (selectedStatus != '') {
            const isActive = selectedStatus === 'active';
            filtered = filtered.filter((product) => {
                return Boolean(product.active) === isActive
            });
        }
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, selectedStatus, props.products]);

    const { products } = props;
    const categories = [
        { value: "Accessories", label: "Acessórios" },
        { value: "CardGame", label: "Jogos de carta" },
        { value: "Collectibles", label: "Colecionáveis" },
        { value: "Decoration", label: "Decoração" },
        { value: "Stationery", label: "Papelaria" },
        { value: "Clothing", label: "Roupas" },
    ];


    let lowOnStockCount = 0;
    let outOfStockCount = 0;
    let totalValue = 0;
    let productCount = 0;

    products.forEach((product) => {
        let currentStock = 0;

        if (product.category === 'Clothing') {
            currentStock = product.clothesVariants?.reduce((sum: any, variant: any) => sum + variant.stock, 0) ?? 0;
        } else {
            currentStock = product.stock ?? 0;
        }

        if (currentStock > 0 && currentStock < 5) {
            lowOnStockCount++;
        }

        if (currentStock === 0) {
            outOfStockCount++;
        }

        totalValue += product.price * currentStock;
    });

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
                    <div className="flex items-center justify-between">
                        <FilterTitle />
                        <StockCreateProduct trigger={<Button><Plus /> Novo Produto</Button>} />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome ou ID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select onValueChange={(value) => setSelectedCategory(value)}>
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
                        <Select onValueChange={(value) => setSelectedStatus(value)}>
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
                    products={filteredProducts}
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
