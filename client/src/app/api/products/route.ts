import { createProduct, fetchProducts } from "@/lib/products";

export async function GET(req: Request) {
    const result = await fetchProducts();
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(req: Request) {
    const { label, description, category, price } = await req.json();
    const result = await createProduct(label, description, category, price);
    const statusCode = result ? 201 : 400;
    return new Response(JSON.stringify(result), {
        status: statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}