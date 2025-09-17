import StockPage from "@/components/shared/stock/stock-page";
import { fetchProducts } from "@/lib/products";

export default async function Page() {
    const products = await fetchProducts();
    return <StockPage products={products} />;
}
