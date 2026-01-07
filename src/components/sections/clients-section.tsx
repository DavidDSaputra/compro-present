"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Partner {
    id: string;
    name: string;
    logoUrl: string | null;
    logoType: string;
    websiteUrl: string | null;
    isActive: boolean;
    order: number;
}

export function ClientsSection() {
    const [clients, setClients] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            try {
                const res = await fetch("/api/partners");
                if (res.ok) {
                    const data = await res.json();
                    const activePartners = data.filter((p: Partner) => p.isActive);
                    setClients(activePartners);
                }
            } catch (error) {
                console.error("Failed to fetch clients:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, []);

    if (loading || clients.length === 0) {
        return null;
    }

    const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

    return (
        <section className="py-16 lg:py-20 bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient accents */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                    <div>
                        <p className="text-blue-400 text-sm font-medium tracking-wide uppercase mb-2">
                            Client Kami
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                            Dipercaya oleh Berbagai Perusahaan
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {clients.slice(0, 3).map((client, i) => (
                                <div
                                    key={client.id}
                                    className="w-10 h-10 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center overflow-hidden"
                                    style={{ zIndex: 3 - i }}
                                >
                                    {client.logoUrl ? (
                                        <Image
                                            src={client.logoUrl}
                                            alt={client.name}
                                            width={32}
                                            height={32}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs font-bold text-slate-600">
                                            {client.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <span className="text-slate-400 text-sm">
                            +{clients.length} perusahaan
                        </span>
                    </div>
                </div>

                {/* Logo Marquee */}
                <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900/90 to-transparent z-10 pointer-events-none rounded-l-2xl" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900/90 to-transparent z-10 pointer-events-none rounded-r-2xl" />

                    {/* Scrolling container */}
                    <div className="flex overflow-hidden">
                        <div className="flex animate-marquee gap-8">
                            {duplicatedClients.map((client, index) => (
                                <a
                                    key={`${client.id}-${index}`}
                                    href={client.websiteUrl || "#"}
                                    target={client.websiteUrl ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="group flex-shrink-0"
                                >
                                    <div className="w-36 h-16 flex items-center justify-center bg-white rounded-xl px-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                                        {client.logoUrl ? (
                                            <Image
                                                src={client.logoUrl}
                                                alt={client.name}
                                                width={120}
                                                height={48}
                                                className="object-contain max-h-10 w-auto"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-slate-700 text-center">
                                                {client.name}
                                            </span>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom text */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    Bergabung bersama perusahaan lain yang telah mempercayakan pengelolaan SDM mereka kepada Present
                </p>
            </div>
        </section>
    );
}
