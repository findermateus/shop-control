export type Product = {
    id: number;
    label: string;
    description: string;
    category: string;
    stock: number;
    active: boolean;
    price: number;
    clothesVariants?: ClothesVariant[];
    priceHistories: PriceHistory[];
    stockHistories?: StockHistory[];
}

export type PriceHistory = {
    date: string;
    price: number;
}

export type StockHistory = {
    date: string;
    justification: string;
    stock: number;
    quantityChanged: number;
    id: number;
}

export type ClothesVariant = {
    size: string;
    stock: number;
    stockHistories: StockHistory[];
}