"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Menu, X, ChevronDown, ArrowRight,
    Briefcase, CalendarCheck, Cpu, Users, Smartphone, LineChart,
    Building2, Factory, ShoppingBag, HeartHandshake,
    BookOpen, MessageSquareQuote, Award,
    FileText, Calendar, BookMarked, HelpCircle,
    Building, Mail, Search,
    LayoutGrid, // Icon for collapsed logo
    Layers, Zap, Sparkles, Smile, Library, Info, Phone // New icons
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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

export function Navbar({ items, logoUrl }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [animationPhase, setAnimationPhase] = React.useState<'idle' | 'orb-appear' | 'orb-move' | 'sidebar-reveal' | 'sidebar-collapse'>('idle');
    const wasScrolledRef = React.useRef(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;

            // Trigger animation on scroll state change
            if (scrolled && !wasScrolledRef.current) {
                // Entering scrolled state: show orb animation
                setAnimationPhase('orb-appear');
                setTimeout(() => setAnimationPhase('orb-move'), 400);
                setTimeout(() => {
                    setAnimationPhase('sidebar-reveal');
                    setIsScrolled(true);
                }, 800);
                setTimeout(() => setAnimationPhase('idle'), 1300);
            } else if (!scrolled && wasScrolledRef.current) {
                // Leaving scrolled state: collapse animation
                setAnimationPhase('sidebar-collapse');
                setTimeout(() => {
                    setIsScrolled(false);
                    setAnimationPhase('idle');
                }, 300);
            }

            wasScrolledRef.current = scrolled;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter out "Fitur" from navigation
    const regularItems = items.filter((item) => item.type !== "cta" && item.label.toLowerCase() !== "fitur");
    const ctaItem = items.find((item) => item.type === "cta");
    const activeItem = regularItems.find(item => item.id === activeDropdown);

    // Reset dropdown when scroll state changes
    React.useEffect(() => {
        setActiveDropdown(null);
    }, [isScrolled]);

    return (
        <>
            {/* 
              TRANSITION ORB - morphing circle element
            */}
            {(animationPhase === 'orb-appear' || animationPhase === 'orb-move') && (
                <div
                    className={cn(
                        "navbar-orb hidden lg:block w-12 h-12",
                        animationPhase === 'orb-appear' && "navbar-orb-enter left-1/2 top-[50px]",
                        animationPhase === 'orb-move' && "navbar-orb-move"
                    )}
                />
            )}

            {/* 
              TOP NAVBAR (Slides Up when scrolled) 
            */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isScrolled ? "-translate-y-full" : "translate-y-0"
                )}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <div className="flex w-full items-center justify-between py-2 px-6 lg:px-12">
                    {/* Left Links */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="/contact" className="text-[10px] font-medium tracking-[0.15em] text-gray-600 uppercase hover:text-gray-900 transition-colors">
                            Hubungi Kami
                        </Link>
                        <Link href="/about" className="text-[10px] font-medium tracking-[0.15em] text-gray-600 uppercase hover:text-gray-900 transition-colors">
                            Tentang Kami
                        </Link>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex-1 lg:flex lg:justify-center">
                        <Image
                            src={logoUrl || "/logo-present.png"}
                            alt="Present"
                            width={180}
                            height={50}
                            className="h-8 md:h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Right Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Search className="h-5 w-5 stroke-[1.5]" />
                        </button>
                        {ctaItem && (
                            <Link href={ctaItem.href || "/contact"}>
                                <Button variant="ghost" className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-900 hover:text-gray-600 hover:bg-transparent">
                                    {ctaItem.label}
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <button
                            className="p-2 text-gray-900"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation Items */}
                <nav className="hidden lg:block w-full border-t border-gray-100 bg-white">
                    <ul className="flex flex-row items-center justify-center p-0 gap-8">
                        {regularItems.map((item) => (
                            <NavItemComponent
                                key={item.id}
                                item={item}
                                activeDropdown={activeDropdown}
                                setActiveDropdown={setActiveDropdown}
                                isScrolled={false} // Always render as Top Mode
                            />
                        ))}
                    </ul>
                </nav>

                {/* Dropdown Panel (Top Mode) */}
                {!isScrolled && (
                    <div
                        className={cn(
                            "absolute left-0 right-0 top-full bg-white transition-all duration-300 ease-out overflow-hidden shadow-xl border-b border-gray-100",
                            activeDropdown ? "opacity-100 max-h-[500px] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"
                        )}
                    >
                        {activeItem && activeItem.children && activeItem.children.length > 0 && (
                            <div className="container mx-auto px-12 py-10">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                    {activeItem.children.map((child) => (
                                        <Link
                                            key={child.id}
                                            href={child.href || "#"}
                                            className="group/item flex flex-col text-center items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            <div className="w-14 h-14 bg-gray-100 mb-4 flex items-center justify-center rounded-full transition-all duration-300 text-gray-400 group-hover/item:text-blue-600 group-hover/item:bg-blue-50">
                                                {getIconForLabel(child.label)}
                                            </div>
                                            <div>
                                                <span className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-900 group-hover/item:text-blue-600 transition-colors duration-300">
                                                    {child.label}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {/* View All */}
                                <div className="text-center pt-6 mt-8 border-t border-gray-100">
                                    <Link
                                        href={`/${activeItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Lihat Semua
                                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* 
              SIDE NAVBAR (appears after orb animation)
            */}
            <div
                className={cn(
                    "hidden lg:flex fixed top-1/2 left-4 z-50 h-auto max-h-[calc(100vh-32px)] w-12 hover:w-[240px] bg-white backdrop-blur-md shadow-2xl rounded-2xl border border-gray-100 flex-col items-center hover:items-start group py-3 overflow-visible transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    // Animation states
                    animationPhase === 'sidebar-reveal' && "animate-sidebar-reveal",
                    animationPhase === 'sidebar-collapse' && "animate-sidebar-collapse",
                    // Visibility based on scroll state
                    isScrolled && animationPhase !== 'sidebar-collapse'
                        ? "-translate-y-1/2 opacity-100"
                        : "-translate-y-1/2 opacity-0 pointer-events-none scale-0"
                )}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                {/* Side Navigation Items */}
                <nav className="w-full flex-1 px-1.5 group-hover:px-3 flex flex-col items-center group-hover:items-stretch overflow-hidden">
                    <ul className="flex flex-col w-full gap-0.5">
                        {regularItems.map((item) => (
                            <NavItemComponent
                                key={item.id}
                                item={item}
                                activeDropdown={activeDropdown}
                                setActiveDropdown={setActiveDropdown}
                                isScrolled={true} // Always render as Side Mode
                            />
                        ))}
                    </ul>
                </nav>

                {/* Side Dropdown Flyout */}
                <div
                    className={cn(
                        "absolute left-full top-0 h-full w-[350px] bg-white rounded-r-2xl border-l border-gray-100 shadow-xl transition-all duration-300 ease-out overflow-hidden ml-2",
                        activeDropdown ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-4 pointer-events-none"
                    )}
                >
                    {activeItem && activeItem.children && activeItem.children.length > 0 && (
                        <div className="p-6 h-full overflow-y-auto">
                            <div className="grid grid-cols-1 gap-6">
                                {activeItem.children.map((child) => (
                                    <Link
                                        key={child.id}
                                        href={child.href || "#"}
                                        className="group/item flex flex-row text-left items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        <div className="w-10 h-10 bg-gray-100 shrink-0 flex items-center justify-center rounded-full transition-all duration-300 text-gray-400 group-hover/item:text-gray-900 group-hover/item:bg-gray-200">
                                            {getIconForLabel(child.label)}
                                        </div>
                                        <div>
                                            <span className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-900 group-hover/item:text-gray-700 transition-colors duration-300 mb-1">
                                                {child.label}
                                            </span>
                                            <span className="text-[10px] text-gray-500 capitalize leading-tight block">
                                                Manage {child.label.toLowerCase()} efficiently
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center pt-6 mt-6 border-t border-gray-100">
                                <Link
                                    href={`/${activeItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    Lihat Semua
                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>



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
    isScrolled
}: {
    item: NavItem;
    activeDropdown: string | null;
    setActiveDropdown: (id: string | null) => void;
    isScrolled: boolean;
}) {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = activeDropdown === item.id;

    // Side Mode - special case for Hubungi Kami (direct link, no dropdown)
    const isContactLink = item.label.toLowerCase().includes("hubungi");

    if (isScrolled) {
        // If it's Hubungi Kami, render as direct link
        if (isContactLink) {
            return (
                <li className="w-full">
                    <Link
                        href={item.href || "/contact"}
                        className="w-full flex items-center p-2 rounded-lg transition-all duration-300 group/btn text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110">
                            {getIconForLabel(item.label)}
                        </div>
                        <span className="ml-4 text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-gray-700">
                            {item.label}
                        </span>
                    </Link>
                </li>
            );
        }

        return (
            <li
                onMouseEnter={() => setActiveDropdown(item.id)}
                className="w-full"
            >
                <button
                    className={cn(
                        "w-full flex items-center p-2 rounded-lg transition-all duration-300 group/btn",
                        isOpen ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                >
                    <div className={cn(
                        "w-5 h-5 flex items-center justify-center transition-transform duration-300",
                        isOpen ? "scale-110" : "group-hover/btn:scale-110"
                    )}>
                        {/* Use map icon based on label, or a generic grid icon if simple */}
                        {getIconForLabel(item.label)}
                    </div>
                    <span className={cn(
                        "ml-4 text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                        isOpen ? "text-gray-900" : "text-gray-700"
                    )}>
                        {item.label}
                    </span>
                    {hasChildren && (
                        <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <ChevronDown className="h-3 w-3 -rotate-90" />
                        </div>
                    )}
                </button>
            </li>
        );
    }

    // Top Mode (Original)
    if (!hasChildren) {
        return (
            <li>
                <Link
                    href={item.href || "#"}
                    className="relative block py-3 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
                >
                    {item.label}
                    <span className="absolute bottom-2 left-0 w-full h-[2px] bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
            </li>
        );
    }

    return (
        <li
            onMouseEnter={() => setActiveDropdown(item.id)}
            className="relative"
        >
            <button
                className={cn(
                    "relative flex items-center gap-1 py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300",
                    isOpen ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
                )}
            >
                {item.label}
                <span className={cn(
                    "absolute bottom-2 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left",
                    isOpen ? "scale-x-100" : "scale-x-0"
                )} />
            </button>
        </li>
    );
}

function MobileMenu({
    items,
    ctaItem,
    onClose,
}: {
    items: NavItem[];
    ctaItem?: NavItem;
    onClose: () => void;
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
                        />
                    </div>
                ))}

            {ctaItem && (
                <div className="pt-8 mt-4 border-t border-gray-200">
                    <Link href={ctaItem.href || "/contact"} onClick={onClose}>
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-sm font-bold tracking-wider uppercase">
                            {ctaItem.label}
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
}: {
    item: NavItem;
    isExpanded: boolean;
    onToggle: () => void;
    onClose: () => void;
}) {
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
        return (
            <Link
                href={item.href || "#"}
                onClick={onClose}
                className="flex items-center py-4 px-2 text-sm font-bold tracking-wider uppercase text-gray-900 hover:text-gray-600 border-b border-gray-100"
            >
                {item.label}
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
                {item.label}
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
                            <span className="font-medium">{child.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
