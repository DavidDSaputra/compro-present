import { SectionRenderer } from "@/components/section-renderer";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { Locale, isValidLocale } from "@/lib/i18n-config";

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

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale: localeParam } = await params;
    const locale: Locale = isValidLocale(localeParam) ? localeParam : "id";

    const [page, dictionary] = await Promise.all([
        getHomePage(),
        getDictionary(locale),
    ]);

    if (!page) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-[#475569]">
                    {locale === "en" ? "Page not found" : "Halaman tidak ditemukan"}
                </p>
            </div>
        );
    }

    return <SectionRenderer sections={page.sections} dictionary={dictionary} />;
}

