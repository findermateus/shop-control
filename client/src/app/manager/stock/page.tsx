import { fetchProducts } from "@/lib/products";

export default async function Page() {
    const products = await fetchProducts();
    return (
        <div>
            Estoque
        </div>
    );
}