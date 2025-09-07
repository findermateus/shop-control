import { disableProduct } from "@/lib/products";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await disableProduct(Number(id));
    const statusCode = data ? 200 : 400;
    return new Response(JSON.stringify(data), {
        status: statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}