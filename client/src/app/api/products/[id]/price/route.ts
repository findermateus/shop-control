import { updateProductPrice } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const body = await req.json();
    const { price } = body;

    await updateProductPrice(id, price);

    return NextResponse.json(
        { message: "Product price updated successfully" },
        { status: 200 }
    );
}
