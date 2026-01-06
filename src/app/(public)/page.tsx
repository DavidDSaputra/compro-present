import { SectionRenderer } from "@/components/section-renderer";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

// Disable caching - always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Present - Solusi HRIS Terdepan Indonesia",
    description: "Platform HRIS terintegrasi untuk mengelola karyawan, absensi, penggajian, dan performa dalam satu sistem yang powerful.",
};

async function getHomePage() {
    const page = await prisma.page.findUnique({
        where: { slug: "home" },
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

    return page;
}

export default async function HomePage() {
    const page = await getHomePage();

    if (!page) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-[#475569]">Halaman tidak ditemukan</p>
            </div>
        );
    }

    return <SectionRenderer sections={page.sections} />;
}
