import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const partner = await prisma.partner.findUnique({
            where: { id },
        });
        if (!partner) {
            return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        }
        return NextResponse.json(partner);
    } catch (error) {
        console.error("Failed to fetch partner:", error);
        return NextResponse.json({ error: "Failed to fetch partner" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const partner = await prisma.partner.update({
            where: { id },
            data: {
                name: body.name,
                logoUrl: body.logoUrl,
                logoType: body.logoType,
                websiteUrl: body.websiteUrl,
                description: body.description,
                isActive: body.isActive,
                order: body.order,
            },
        });
        return NextResponse.json(partner);
    } catch (error) {
        console.error("Failed to update partner:", error);
        return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.partner.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete partner:", error);
        return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
    }
}
