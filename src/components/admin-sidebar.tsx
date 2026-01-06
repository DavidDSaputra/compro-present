"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Navigation,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Navigasi", href: "/admin/navigation", icon: Navigation },
    { label: "Halaman", href: "/admin/pages", icon: FileText },
    { label: "Leads", href: "/admin/leads", icon: Users },
    { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E2E8F0] transform transition-transform duration-200 lg:transform-none",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-[#E2E8F0]">
                        <Link href="/admin" className="flex items-center gap-2">
                            <Image
                                src="/logo-present.png"
                                alt="Present"
                                width={120}
                                height={36}
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[#DBEAFE] text-[#1E40AF]"
                                            : "text-[#475569] hover:bg-[#F1F5F9]"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-[#E2E8F0]">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
