"use client";

import Image from "next/image";

interface LogoItem {
    id: string;
    title: string | null;
    imageUrl: string | null;
}

interface LogoCloudSectionProps {
    heading: string | null;
    items: LogoItem[];
}

export function LogoCloudSection({ heading, items }: LogoCloudSectionProps) {

    const duplicatedItems = [...items, ...items, ...items];

    if (items.length === 0) {
        return (
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8">
                    {heading && (
                        <p className="text-center text-slate-500 mb-10">{heading}</p>
                    )}
                    <p className="text-center text-slate-400">Belum ada data untuk ditampilkan</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                            Trusted Partners
                        </span>
                    </div>
                    {heading && (
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            {heading}
                        </h2>
                    )}
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Bergabung dengan ratusan perusahaan terkemuka yang telah mempercayakan manajemen HR mereka kepada kami
                    </p>
                </div>

                {/* Logo Marquee */}
                <div className="relative">
                    {/* Gradient Overlays for fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    {/* Scrolling container */}
                    <div className="flex overflow-hidden">
                        <div className="flex animate-marquee gap-12 py-8">
                            {duplicatedItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="group flex-shrink-0"
                                >
                                    <div className="relative w-40 h-20 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 px-6 py-4 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-200">
                                        {item.imageUrl ? (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title || "Client Logo"}
                                                fill
                                                className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors text-center">
                                                {item.title}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
