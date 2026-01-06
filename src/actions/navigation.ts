"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getNavigationItems() {
    return prisma.navigationItem.findMany({
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
            children: {
                orderBy: { order: "asc" },
            },
        },
    });
}

export async function createNavigationItem(data: {
    label: string;
    href?: string;
    type: string;
    parentId?: string;
}) {
    const navigation = await prisma.navigation.findFirst();
    if (!navigation) return { success: false, message: "Navigation not found" };

    const maxOrder = await prisma.navigationItem.aggregate({
        where: { parentId: data.parentId || null },
        _max: { order: true },
    });

    await prisma.navigationItem.create({
        data: {
            navigationId: navigation.id,
            label: data.label,
            href: data.href || null,
            type: data.type,
            parentId: data.parentId || null,
            order: (maxOrder._max.order || 0) + 1,
        },
    });

    revalidatePath("/admin/navigation");
    revalidatePath("/");
    return { success: true };
}

export async function updateNavigationItem(
    id: string,
    data: { label: string; href?: string; type: string }
) {
    await prisma.navigationItem.update({
        where: { id },
        data: {
            label: data.label,
            href: data.href || null,
            type: data.type,
        },
    });

    revalidatePath("/admin/navigation");
    revalidatePath("/");
    return { success: true };
}

export async function deleteNavigationItem(id: string) {
    await prisma.navigationItem.delete({ where: { id } });
    revalidatePath("/admin/navigation");
    revalidatePath("/");
    return { success: true };
}

export async function reorderNavigationItem(id: string, direction: "up" | "down") {
    const item = await prisma.navigationItem.findUnique({ where: { id } });
    if (!item) return { success: false };

    const siblings = await prisma.navigationItem.findMany({
        where: { parentId: item.parentId },
        orderBy: { order: "asc" },
    });

    const currentIndex = siblings.findIndex((s) => s.id === id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= siblings.length) {
        return { success: false };
    }

    const swapItem = siblings[swapIndex];

    await prisma.$transaction([
        prisma.navigationItem.update({
            where: { id: item.id },
            data: { order: swapItem.order },
        }),
        prisma.navigationItem.update({
            where: { id: swapItem.id },
            data: { order: item.order },
        }),
    ]);

    revalidatePath("/admin/navigation");
    revalidatePath("/");
    return { success: true };
}
