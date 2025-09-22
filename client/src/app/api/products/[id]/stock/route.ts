import { updateProductStock, fetchProducts } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { quantityChanged, size } = body;

        if (!quantityChanged || quantityChanged === 0) {
            return NextResponse.json(
                { error: "Quantidade de alteração é obrigatória e deve ser diferente de zero" },
                { status: 400 }
            );
        }

        let clothingVariantId: number | undefined;

        if (size) {
            const products = await fetchProducts();
            const product = products.find(p => p.id.toString() === id);

            if (!product) {
                return NextResponse.json(
                    { error: "Produto não encontrado" },
                    { status: 404 }
                );
            }

            if (product.clothesVariants) {
                const variant = product.clothesVariants.find((v: any) => v.size === size);
                if (variant) {
                    clothingVariantId = variant.id;
                } else {
                    return NextResponse.json(
                        { error: "Tamanho não encontrado" },
                        { status: 400 }
                    );
                }
            }
        }

        await updateProductStock(id, Number(quantityChanged), clothingVariantId);

        return NextResponse.json(
            { message: "Stock updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product stock:", error);
        return NextResponse.json(
            { error: "Failed to update product stock" },
            { status: 500 }
        );
    }
}
