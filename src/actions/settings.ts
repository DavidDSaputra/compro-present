"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    return prisma.siteSetting.findFirst();
}

export async function updateSiteSettings(data: {
    companyName: string;
    logoUrl?: string;
    address?: string;
    email?: string;
    whatsappLink?: string;
    mapEmbedHtml?: string;
}) {
    const existing = await prisma.siteSetting.findFirst();

    if (existing) {
        await prisma.siteSetting.update({
            where: { id: existing.id },
            data: {
                companyName: data.companyName,
                logoUrl: data.logoUrl || null,
                address: data.address || null,
                email: data.email || null,
                whatsappLink: data.whatsappLink || null,
                mapEmbedHtml: data.mapEmbedHtml || null,
            },
        });
    } else {
        await prisma.siteSetting.create({
            data: {
                companyName: data.companyName,
                logoUrl: data.logoUrl || null,
                address: data.address || null,
                email: data.email || null,
                whatsappLink: data.whatsappLink || null,
                mapEmbedHtml: data.mapEmbedHtml || null,
            },
        });
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
}
