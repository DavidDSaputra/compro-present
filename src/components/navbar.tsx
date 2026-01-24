"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
    Menu, X, ChevronDown, ArrowRight,
    Briefcase, CalendarCheck, Cpu, Users, Smartphone, LineChart,
    Building2, Factory, ShoppingBag, HeartHandshake,
    BookOpen, MessageSquareQuote, Award,
    FileText, Calendar, BookMarked, HelpCircle,
    Building, Mail, Globe,
    LayoutGrid, // Icon for collapsed logo
    Layers, Zap, Sparkles, Smile, Library, Info, Phone // New icons
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Locale } from "@/lib/i18n-config";
import { Dictionary } from "@/dictionaries";

interface NavItem {
    id: string;
    label: string;
    href: string | null;
    type: string;
    children?: NavItem[];
}

interface NavbarProps {
    items: NavItem[];
    logoUrl: string | null;
    locale: Locale;
    dictionary: Dictionary;
}

// Helper to get icon based on label
function getIconForLabel(label: string) {
    const lower = label.toLowerCase();

    // Top Level Categories
    if (lower === "produk" || lower === "products") return <Layers className="h-5 w-5" />;
    if (lower === "solusi" || lower === "solutions") return <Zap className="h-5 w-5" />;
    if (lower === "fitur" || lower === "features") return <Sparkles className="h-5 w-5" />;
    if (lower === "pelanggan" || lower === "customers") return <Smile className="h-5 w-5" />;
    if (lower === "resources") return <Library className="h-5 w-5" />;
    if (lower === "tentang kami" || lower === "about us" || lower === "tentang") return <Info className="h-5 w-5" />;
    if (lower.includes("hubungi") || lower.includes("contact")) return <Phone className="h-5 w-5" />;

    // Sub Items - Produk
    if (lower.includes("core") || lower.includes("hris")) return <Cpu className="h-5 w-5" />;
    if (lower.includes("attendance") || lower.includes("absensi")) return <CalendarCheck className="h-5 w-5" />;
    if (lower.includes("payroll") || lower.includes("gaji")) return <Briefcase className="h-5 w-5" />;
    if (lower.includes("recruitment") || lower.includes("rekrutmen")) return <Users className="h-5 w-5" />;
    if (lower.includes("performance") || lower.includes("kinerja")) return <LineChart className="h-5 w-5" />;
    if (lower.includes("mobile") || lower.includes("app")) return <Smartphone className="h-5 w-5" />;

    // Sub Items - Solusi
    if (lower.includes("enterprise")) return <Building2 className="h-5 w-5" />;
    if (lower.includes("manufacturing") || lower.includes("pabrik")) return <Factory className="h-5 w-5" />;
    if (lower.includes("retail")) return <ShoppingBag className="h-5 w-5" />;
    if (lower.includes("services") || lower.includes("jasa")) return <HeartHandshake className="h-5 w-5" />;

    // Sub Items - Pelanggan
    if (lower.includes("customer") || lower.includes("stories")) return <BookOpen className="h-5 w-5" />;
    if (lower.includes("testimoni")) return <MessageSquareQuote className="h-5 w-5" />;
    if (lower.includes("logo") || lower.includes("klien")) return <Award className="h-5 w-5" />;

    // Sub Items - Resources
    if (lower.includes("blog")) return <FileText className="h-5 w-5" />;
    if (lower.includes("webinar") || lower.includes("event")) return <Calendar className="h-5 w-5" />;
    if (lower.includes("ebook") || lower.includes("whitepaper")) return <BookMarked className="h-5 w-5" />;
    if (lower.includes("faq")) return <HelpCircle className="h-5 w-5" />;

    // Sub Items - Tentang Kami
    if (lower.includes("profil") || lower.includes("about")) return <Building className="h-5 w-5" />;
    if (lower.includes("karier") || lower.includes("career")) return <Briefcase className="h-5 w-5" />;

    // Default
    return <LayoutGrid className="h-5 w-5" />;
}

export function Navbar({ items, logoUrl, locale, dictionary }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
    const [isScrolled, setIsScrolled] = React.useState(false);

    const t = dictionary;

    // Function to switch locale by navigating to new URL
    const switchLocale = (newLocale: Locale) => {
        // Set cookie for middleware
        document.cookie = `locale=${newLocale};path=/;max-age=31536000`;

        // Get current path without locale prefix
        const segments = pathname.split("/");
        if (segments[1] === "id" || segments[1] === "en") {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }
        router.push(segments.join("/"));
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter out "Fitur" from navigation
    const regularItems = items.filter((item) => item.type !== "cta" && item.label.toLowerCase() !== "fitur");
    const ctaItem = items.find((item) => item.type === "cta");
    const activeItem = regularItems.find(item => item.id === activeDropdown);

    // Helper function to translate menu labels
    const translateMenuLabel = (label: string): string => {
        const key = label.toLowerCase().replace(/\s+/g, '');
        const menuTranslations = t.navbar.menu as Record<string, string>;

        // Map database labels to translation keys
        const labelKeyMap: Record<string, string> = {
            'produk': 'produk',
            'products': 'produk',
            'solusi': 'solusi',
            'solutions': 'solusi',
            'pelanggan': 'pelanggan',
            'customers': 'pelanggan',
            'resources': 'resources',
            'tentangkami': 'tentangKami',
            'aboutus': 'tentangKami',
            'hubungikami': 'hubungiKami',
            'contactus': 'hubungiKami',
        };

        const translationKey = labelKeyMap[key];
        if (translationKey && menuTranslations[translationKey]) {
            return menuTranslations[translationKey];
        }
        return label;
    };

    // Helper function to translate submenu labels
    const translateSubmenuLabel = (label: string): string => {
        const key = label.toLowerCase().replace(/\s+/g, '');
        const submenuTranslations = t.navbar.submenu as Record<string, string>;

        const labelKeyMap: Record<string, string> = {
            'presenthriscore': 'hrisCore',
            'hriscore': 'hrisCore',
            'attendance': 'attendance',
            'absensi': 'attendance',
            'payroll': 'payroll',
            'penggajian': 'payroll',
            'recruitment': 'recruitment',
            'rekrutmen': 'recruitment',
            'performance': 'performance',
            'kinerja': 'performance',
            'mobilehrapp': 'mobileApp',
            'aplikasimobilehr': 'mobileApp',
            'enterprise': 'enterprise',
            'manufacturing': 'manufacturing',
            'manufaktur': 'manufacturing',
            'retail': 'retail',
            'services': 'services',
            'jasa': 'services',
            'customerstories': 'customerStories',
            'ceritapelanggan': 'customerStories',
            'testimonials': 'testimonials',
            'testimoni': 'testimonials',
            'ourclients': 'clients',
            'klienkami': 'clients',
            'blog': 'blog',
            'webinars': 'webinars',
            'webinar': 'webinars',
            'e-books': 'ebooks',
            'e-book': 'ebooks',
            'ebooks': 'ebooks',
            'ebook': 'ebooks',
            'faq': 'faq',
            'companyprofile': 'companyProfile',
            'profilperusahaan': 'companyProfile',
            'careers': 'careers',
            'karier': 'careers',
            'contactus': 'contact',
            'hubungikami': 'contact',
        };

        const translationKey = labelKeyMap[key];
        if (translationKey && submenuTranslations[translationKey]) {
            return submenuTranslations[translationKey];
        }
        return label;
    };

    // Reset dropdown when scroll state changes
    React.useEffect(() => {
        setActiveDropdown(null);
    }, [isScrolled]);

    return (
        <>
            {/* 
              TOP NAVBAR (Sticky) 
            */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 flex flex-col",
                    isScrolled ? "shadow-md" : "border-b border-gray-100"
                )}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <div className={cn(
                    "flex w-full items-center justify-between px-12 lg:px-16 transition-all duration-300",
                    isScrolled ? "py-2" : "py-4"
                )}>
                    {/* Logo - Left Side */}
                    <Link href="/" className="shrink-0 ml-5">
                        <Image
                            src={logoUrl || "/logo-present.png"}
                            alt="Present"
                            width={220}
                            height={60}
                            className="w-auto h-9 md:h-12 transition-all duration-300"
                            priority
                        />
                    </Link>

                    {/* Desktop Right Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Language Selector */}
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Globe className="h-5 w-5 text-gray-500" />
                            <button
                                onClick={() => switchLocale("id")}
                                className={cn(
                                    "px-1 transition-colors",
                                    locale === "id" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                ID
                            </button>
                            <button
                                onClick={() => switchLocale("en")}
                                className={cn(
                                    "px-1 transition-colors",
                                    locale === "en" ? "text-[#DAA520]" : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                EN
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-gray-200 mx-2" />

                        {/* Sign In */}
                        <Link
                            href="/admin/login"
                            className="text-sm font-medium text-[#1E40AF] hover:text-[#1E3A8A] transition-colors"
                        >
                            {t.navbar.signIn}
                        </Link>

                        {/* Hubungi Sales Button */}
                        <Link href="/contact">
                            <Button className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-sm font-medium px-5 h-10 rounded-lg shadow-sm">
                                {t.navbar.contactSales}
                            </Button>
                        </Link>

                        {/* Coba Gratis Button */}
                        <Link href="/demo">
                            <Button
                                variant="outline"
                                className="border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white text-sm font-medium px-5 h-10 rounded-lg"
                            >
                                {t.navbar.tryFree}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Right Actions: Language + Menu */}
                    <div className="lg:hidden flex items-center gap-4">
                        {/* ID EN Selector */}
                        <div className="flex items-center gap-2 text-sm font-bold">
                            <button
                                onClick={() => switchLocale("id")}
                                className={cn(
                                    "transition-colors",
                                    locale === "id" ? "text-gray-900" : "text-gray-400"
                                )}
                            >
                                ID
                            </button>
                            <button
                                onClick={() => switchLocale("en")}
                                className={cn(
                                    "transition-colors",
                                    locale === "en" ? "text-[#DAA520]" : "text-gray-400"
                                )}
                            >
                                EN
                            </button>
                        </div>

                        {/* Menu Toggle */}
                        <button
                            className="p-1 text-[#1E40AF]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-8 w-8 stroke-[3]" />
                            ) : (
                                <Menu className="h-8 w-8 stroke-[3]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation Items */}
                <nav className="hidden lg:block w-full border-t border-gray-100 bg-white">
                    <ul className="flex flex-row items-center px-12 lg:px-16">
                        {regularItems.map((item) => (
                            <NavItemComponent
                                key={item.id}
                                item={item}
                                activeDropdown={activeDropdown}
                                setActiveDropdown={setActiveDropdown}
                                translateLabel={translateMenuLabel}
                            />
                        ))}
                    </ul>
                </nav>

                {/* Dropdown Panel */}
                <div
                    className={cn(
                        "absolute left-0 right-0 top-full -mt-[1px] z-10 bg-[#1E40AF] transition-all duration-300 ease-out overflow-hidden shadow-xl",
                        activeDropdown ? "opacity-100 max-h-[400px] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"
                    )}
                    onMouseEnter={() => {
                        // Keep dropdown open when hovering panel
                        if (activeDropdown) setActiveDropdown(activeDropdown);
                    }}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    {activeItem && activeItem.children && activeItem.children.length > 0 && (
                        <div className="px-12 lg:px-16 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-2">
                                {activeItem.children.map((child) => (
                                    <Link
                                        key={child.id}
                                        href={child.href || "#"}
                                        className="block text-white/80 hover:text-white focus:text-white transition-colors duration-200"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        <span className="text-sm">
                                            {translateSubmenuLabel(child.label)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            {/* View All */}
                            <div className="text-left mt-6 pt-3 border-t border-white/20">
                                <Link
                                    href={`/${activeItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-white/80 hover:text-white transition-colors duration-300"
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    {t.navbar.viewAll} {translateMenuLabel(activeItem.label)}
                                    <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-white lg:hidden transition-all duration-500 ease-in-out",
                    mobileMenuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full pointer-events-none"
                )}
            >
                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 p-2 text-gray-900 rounded-full hover:bg-gray-100 z-50"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="relative h-full pt-20 px-8 overflow-y-auto">
                    <MobileMenu
                        items={items}
                        ctaItem={ctaItem}
                        onClose={() => setMobileMenuOpen(false)}
                        translateMenuLabel={translateMenuLabel}
                        translateSubmenuLabel={translateSubmenuLabel}
                    />
                </div>
            </div>
        </>
    );
}

function NavItemComponent({
    item,
    activeDropdown,
    setActiveDropdown,
    translateLabel,
}: {
    item: NavItem;
    activeDropdown: string | null;
    setActiveDropdown: (id: string | null) => void;
    translateLabel: (label: string) => string;
}) {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = activeDropdown === item.id;

    if (!hasChildren) {
        return (
            <li>
                <Link
                    href={item.href || "#"}
                    className="relative block py-4 px-4 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-700 hover:text-[#1E40AF] transition-colors duration-300"
                >
                    {translateLabel(item.label)}
                </Link>
            </li>
        );
    }

    return (
        <li
            onMouseEnter={() => setActiveDropdown(item.id)}
            className="flex h-full"
        >
            <button
                className={cn(
                    "relative flex items-center gap-1 py-4 px-6 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200",
                    isOpen
                        ? "bg-[#1E40AF] text-white"
                        : "text-gray-700 hover:text-[#1E40AF]"
                )}
            >
                {translateLabel(item.label)}
            </button>
        </li>
    );
}

function MobileMenu({
    items,
    ctaItem,
    onClose,
    translateMenuLabel,
    translateSubmenuLabel,
}: {
    items: NavItem[];
    ctaItem?: NavItem;
    onClose: () => void;
    translateMenuLabel: (label: string) => string;
    translateSubmenuLabel: (label: string) => string;
}) {
    const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

    const toggleExpanded = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-1 pb-20">
            {items
                .filter((item) => item.type !== "cta")
                .map((item, index) => (
                    <div
                        key={item.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <MobileNavItem
                            item={item}
                            isExpanded={expandedItems.includes(item.id)}
                            onToggle={() => toggleExpanded(item.id)}
                            onClose={onClose}
                            translateMenuLabel={translateMenuLabel}
                            translateSubmenuLabel={translateSubmenuLabel}
                        />
                    </div>
                ))}

            {ctaItem && (
                <div className="pt-8 mt-4 border-t border-gray-200">
                    <Link href={ctaItem.href || "/contact"} onClick={onClose}>
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-sm font-bold tracking-wider uppercase">
                            {translateMenuLabel(ctaItem.label)}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

function MobileNavItem({
    item,
    isExpanded,
    onToggle,
    onClose,
    translateMenuLabel,
    translateSubmenuLabel,
}: {
    item: NavItem;
    isExpanded: boolean;
    onToggle: () => void;
    onClose: () => void;
    translateMenuLabel: (label: string) => string;
    translateSubmenuLabel: (label: string) => string;
}) {
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
        return (
            <Link
                href={item.href || "#"}
                onClick={onClose}
                className="flex items-center py-4 px-2 text-sm font-bold tracking-wider uppercase text-gray-900 hover:text-gray-600 border-b border-gray-100"
            >
                {translateMenuLabel(item.label)}
            </Link>
        );
    }

    return (
        <div className="border-b border-gray-100">
            <button
                onClick={onToggle}
                className={cn(
                    "flex w-full items-center justify-between py-4 px-2 text-sm font-bold tracking-wider uppercase transition-colors",
                    isExpanded ? "text-blue-600" : "text-gray-900"
                )}
            >
                {translateMenuLabel(item.label)}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isExpanded && "rotate-180"
                    )}
                />
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out bg-gray-50",
                    isExpanded ? "max-h-96 opacity-100 mb-2" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-3 space-y-1">
                    {item.children?.map((child) => (
                        <Link
                            key={child.id}
                            href={child.href || "#"}
                            onClick={onClose}
                            className="flex items-center gap-3 py-3 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                        >
                            <div className="text-gray-400">
                                {getIconForLabel(child.label)}
                            </div>
                            <span className="font-medium">{translateSubmenuLabel(child.label)}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
