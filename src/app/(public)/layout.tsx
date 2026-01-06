import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import prisma from "@/lib/prisma";

async function getNavigation() {
    const navigation = await prisma.navigation.findFirst({
        where: { name: "Main Navigation" },
        include: {
            items: {
                where: { parentId: null },
                orderBy: { order: "asc" },
                include: {
                    children: {
                        orderBy: { order: "asc" },
                    },
                },
            },
        },
    });

    return navigation?.items || [];
}

async function getSiteSettings() {
    const settings = await prisma.siteSetting.findFirst();
    return settings;
}

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [navItems, settings] = await Promise.all([
        getNavigation(),
        getSiteSettings(),
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar items={navItems} logoUrl={settings?.logoUrl || null} />
            <main className="flex-1">{children}</main>
            <Footer
                logoUrl={settings?.logoUrl || null}
                companyName={settings?.companyName || "Present"}
                address="Lorem Ipsum Dolor Sit Amet"
                email="lorem.ipsum@gmail.com"
                whatsappLink={settings?.whatsappLink || null}
            />
        </div>
    );
}
