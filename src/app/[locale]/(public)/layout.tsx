import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import prisma from "@/lib/prisma";
import { getDictionary } from "@/dictionaries";
import { Locale, isValidLocale } from "@/lib/i18n-config";

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

interface PublicLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function PublicLayout({
    children,
    params,
}: PublicLayoutProps) {
    const { locale: localeParam } = await params;
    const locale: Locale = isValidLocale(localeParam) ? localeParam : "id";

    const [navItems, settings, dictionary] = await Promise.all([
        getNavigation(),
        getSiteSettings(),
        getDictionary(locale),
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar
                items={navItems}
                logoUrl={settings?.logoUrl || null}
                locale={locale}
                dictionary={dictionary}
            />
            <main className="flex-1">{children}</main>
            <Footer
                logoUrl={settings?.logoUrl || null}
                companyName={settings?.companyName || "Present"}
                address={settings?.address || null}
                email={settings?.email || null}
                whatsappLink={settings?.whatsappLink || null}
                locale={locale}
                dictionary={dictionary}
            />
            <CookieConsent locale={locale} dictionary={dictionary} />
        </div>
    );
}

