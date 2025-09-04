import { fetchProducts } from "@/lib/products";

export async function GET(req: Request) {
    const result = await fetchProducts();
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}