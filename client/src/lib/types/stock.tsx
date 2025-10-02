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
}

export type PriceHistory = {
    date: string;
    price: number;
}

export type ClothesVariant = {
    size: string;
    stock: number;
}