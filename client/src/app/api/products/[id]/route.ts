import { updateProduct } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const body = await req.json();
    const { label, description } = body;
    await updateProduct(id, label, description);
    return NextResponse.json(
        { message: "Product updated successfully" },
        { status: 200 }
    );
}
