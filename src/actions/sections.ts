"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSections(pageId: string) {
    return prisma.section.findMany({
        where: { pageId },
        orderBy: { order: "asc" },
        include: {
            _count: {
                select: { items: true },
            },
        },
    });
}

export async function createSection(
    pageId: string,
    data: {
        type: string;
        heading?: string;
        subheading?: string;
        ctaPrimaryLabel?: string;
        ctaPrimaryHref?: string;
        ctaSecondaryLabel?: string;
        ctaSecondaryHref?: string;
        imageUrl?: string;
    }
) {
    const maxOrder = await prisma.section.aggregate({
        where: { pageId },
        _max: { order: true },
    });

    await prisma.section.create({
        data: {
            pageId,
            type: data.type,
            heading: data.heading || null,
            subheading: data.subheading || null,
            ctaPrimaryLabel: data.ctaPrimaryLabel || null,
            ctaPrimaryHref: data.ctaPrimaryHref || null,
            ctaSecondaryLabel: data.ctaSecondaryLabel || null,
            ctaSecondaryHref: data.ctaSecondaryHref || null,
            imageUrl: data.imageUrl || null,
            order: (maxOrder._max.order || 0) + 1,
        },
    });

    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}

export async function updateSection(
    id: string,
    data: {
        type: string;
        heading?: string;
        subheading?: string;
        ctaPrimaryLabel?: string;
        ctaPrimaryHref?: string;
        ctaSecondaryLabel?: string;
        ctaSecondaryHref?: string;
        imageUrl?: string;
    }
) {
    await prisma.section.update({
        where: { id },
        data: {
            type: data.type,
            heading: data.heading || null,
            subheading: data.subheading || null,
            ctaPrimaryLabel: data.ctaPrimaryLabel || null,
            ctaPrimaryHref: data.ctaPrimaryHref || null,
            ctaSecondaryLabel: data.ctaSecondaryLabel || null,
            ctaSecondaryHref: data.ctaSecondaryHref || null,
            imageUrl: data.imageUrl || null,
        },
    });

    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}

export async function deleteSection(id: string) {
    await prisma.section.delete({ where: { id } });
    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}

export async function reorderSection(id: string, direction: "up" | "down") {
    const section = await prisma.section.findUnique({ where: { id } });
    if (!section) return { success: false };

    const siblings = await prisma.section.findMany({
        where: { pageId: section.pageId },
        orderBy: { order: "asc" },
    });

    const currentIndex = siblings.findIndex((s) => s.id === id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= siblings.length) {
        return { success: false };
    }

    const swapSection = siblings[swapIndex];

    await prisma.$transaction([
        prisma.section.update({
            where: { id: section.id },
            data: { order: swapSection.order },
        }),
        prisma.section.update({
            where: { id: swapSection.id },
            data: { order: section.order },
        }),
    ]);

    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}
