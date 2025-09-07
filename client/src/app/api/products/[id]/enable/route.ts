import { enableProduct } from "@/lib/products";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const data = await enableProduct(id);
    const statusCode = data ? 200 : 400;
    return new Response(JSON.stringify(data), {
        status: statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}