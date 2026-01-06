"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSectionWithItems(sectionId: string) {
    return prisma.section.findUnique({
        where: { id: sectionId },
        include: {
            items: {
                orderBy: { order: "asc" },
            },
            page: true,
        },
    });
}

export async function createSectionItem(
    sectionId: string,
    data: {
        title?: string;
        subtitle?: string;
        imageUrl?: string;
        href?: string;
        tag?: string;
    }
) {
    const maxOrder = await prisma.sectionItem.aggregate({
        where: { sectionId },
        _max: { order: true },
    });

    await prisma.sectionItem.create({
        data: {
            sectionId,
            title: data.title || null,
            subtitle: data.subtitle || null,
            imageUrl: data.imageUrl || null,
            href: data.href || null,
            tag: data.tag || null,
            order: (maxOrder._max.order || 0) + 1,
        },
    });

    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}

export async function updateSectionItem(
    id: string,
    data: {
        title?: string;
        subtitle?: string;
        imageUrl?: string;
        href?: string;
        tag?: string;
    }
) {
    await prisma.sectionItem.update({
        where: { id },
        data: {
            title: data.title || null,
            subtitle: data.subtitle || null,
            imageUrl: data.imageUrl || null,
            href: data.href || null,
            tag: data.tag || null,
        },
    });

    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}

export async function deleteSectionItem(id: string) {
    await prisma.sectionItem.delete({ where: { id } });
    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}

export async function reorderSectionItem(id: string, direction: "up" | "down") {
    const item = await prisma.sectionItem.findUnique({ where: { id } });
    if (!item) return { success: false };

    const siblings = await prisma.sectionItem.findMany({
        where: { sectionId: item.sectionId },
        orderBy: { order: "asc" },
    });

    const currentIndex = siblings.findIndex((s) => s.id === id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= siblings.length) {
        return { success: false };
    }

    const swapItem = siblings[swapIndex];

    await prisma.$transaction([
        prisma.sectionItem.update({
            where: { id: item.id },
            data: { order: swapItem.order },
        }),
        prisma.sectionItem.update({
            where: { id: swapItem.id },
            data: { order: item.order },
        }),
    ]);

    revalidatePath("/admin/pages");
    revalidatePath("/");
    return { success: true };
}
