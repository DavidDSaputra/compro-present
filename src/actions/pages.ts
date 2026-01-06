"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPages() {
    return prisma.page.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { sections: true },
            },
        },
    });
}

export async function getPageBySlug(slug: string) {
    return prisma.page.findUnique({
        where: { slug },
        include: {
            sections: {
                orderBy: { order: "asc" },
                include: {
                    items: {
                        orderBy: { order: "asc" },
                    },
                },
            },
        },
    });
}

export async function createPage(data: { slug: string; title: string }) {
    try {
        await prisma.page.create({
            data: {
                slug: data.slug,
                title: data.title,
            },
        });
        revalidatePath("/admin/pages");
        return { success: true };
    } catch {
        return { success: false, message: "Slug sudah digunakan" };
    }
}

export async function updatePage(
    id: string,
    data: { slug: string; title: string }
) {
    try {
        await prisma.page.update({
            where: { id },
            data: {
                slug: data.slug,
                title: data.title,
            },
        });
        revalidatePath("/admin/pages");
        revalidatePath(`/${data.slug}`);
        return { success: true };
    } catch {
        return { success: false, message: "Slug sudah digunakan" };
    }
}

export async function deletePage(id: string) {
    await prisma.page.delete({ where: { id } });
    revalidatePath("/admin/pages");
    return { success: true };
}
