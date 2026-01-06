"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

interface FooterProps {
    logoUrl: string | null;
    companyName: string;
    address: string | null;
    email: string | null;
    whatsappLink: string | null;
}

export function Footer({ logoUrl, companyName, address, email, whatsappLink }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Produk",
            links: [
                { label: "HRIS Core", href: "/products/hris-core" },
                { label: "Attendance", href: "/products/attendance" },
                { label: "Payroll", href: "/products/payroll" },
                { label: "Performance", href: "/products/performance" },
                { label: "Recruitment", href: "/products/recruitment" },
            ],
        },
        {
            title: "Perusahaan",
            links: [
                { label: "Tentang Kami", href: "/about" },
                { label: "Karier", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Hubungi Kami", href: "/contact" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Documentation", href: "/docs" },
                { label: "FAQ", href: "/faq" },
                { label: "Webinar", href: "/events" },
                { label: "E-book", href: "/resources/ebooks" },
            ],
        },
    ];

    const socialLinks = [
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
        { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    ];

    return (
        <footer className="relative bg-slate-50 text-slate-900 overflow-hidden">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-[150px]" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-200/20 rounded-full blur-[150px]" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                        {/* Left Side - Brand & Newsletter */}
                        <div className="lg:col-span-5">
                            <Link href="/" className="inline-block mb-8 group">
                                <Image
                                    src={logoUrl || "/logo-present.png"}
                                    alt={companyName}
                                    width={160}
                                    height={48}
                                    className="h-12 w-auto transition-transform group-hover:scale-105"
                                />
                            </Link>

                            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-sm">
                                Platform HRIS terintegrasi untuk mengelola karyawan, absensi, penggajian, dan performa dalam satu sistem yang powerful.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-4 mb-10">
                                {address && (
                                    <div className="flex items-start gap-3 group">
                                        <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5 group-hover:text-violet-500 transition-colors" />
                                        <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                                            {address}
                                        </p>
                                    </div>
                                )}
                                {email && (
                                    <a href={`mailto:${email}`} className="flex items-center gap-3 group">
                                        <Mail className="h-5 w-5 text-slate-400 group-hover:text-violet-500 transition-colors" />
                                        <span className="text-slate-500 text-sm group-hover:text-slate-900 transition-colors">
                                            {email}
                                        </span>
                                    </a>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 hover:bg-white transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Link Columns */}
                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-8 lg:pl-16">
                            {footerLinks.map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="group inline-flex items-center gap-1 text-slate-600 text-sm hover:text-slate-900 transition-colors duration-300"
                                                >
                                                    <span>{link.label}</span>
                                                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 border-t border-slate-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm">
                            © {currentYear} {companyName}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="text-slate-400 text-sm hover:text-slate-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-slate-400 text-sm hover:text-slate-600 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Large background text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 pointer-events-none select-none">
                <span className="text-[20vw] font-bold text-slate-200/50 whitespace-nowrap tracking-tighter">
                    PRESENT
                </span>
            </div>
        </footer>
    );
}
