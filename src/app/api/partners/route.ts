import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(partners);
    } catch (error) {
        console.error("Failed to fetch partners:", error);
        return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const partner = await prisma.partner.create({
            data: {
                name: body.name,
                logoUrl: body.logoUrl,
                logoType: body.logoType || "link",
                websiteUrl: body.websiteUrl,
                description: body.description,
                isActive: body.isActive ?? true,
                order: body.order ?? 0,
            },
        });
        return NextResponse.json(partner, { status: 201 });
    } catch (error) {
        console.error("Failed to create partner:", error);
        return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
    }
}
