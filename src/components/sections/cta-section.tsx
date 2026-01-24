"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dictionary } from "@/dictionaries";

interface CtaSectionProps {
    heading: string | null;
    subheading: string | null;
    ctaPrimaryLabel: string | null;
    ctaPrimaryHref: string | null;
    dictionary?: Dictionary;
}

export function CtaSection({
    heading,
    subheading,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    dictionary,
}: CtaSectionProps) {
    const t = dictionary?.cta;

    return (
        <section className="relative py-32 lg:py-48 overflow-hidden bg-white">
            {/* Animated gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-[#325095]/10 via-[#6284bb]/10 via-40% to-[#325095]/10 rounded-full blur-[100px] animate-spin-slow" />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="container relative mx-auto px-4 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Eyebrow badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 border border-slate-200 mb-10 hover:bg-slate-50 transition-colors cursor-default">
                        <div className="relative">
                            <span className="absolute inset-0 rounded-full bg-[#325095] animate-ping opacity-75" />
                            <span className="relative block w-2 h-2 rounded-full bg-[#325095]" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 tracking-wide">
                            {t?.badge || "Mulai Transformasi Sekarang"}
                        </span>
                    </div>

                    {/* Main heading */}
                    {heading && (
                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            {heading.split(' ').slice(0, -1).join(' ')}{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-[#325095] via-[#4a6aa8] to-[#6284bb] bg-clip-text text-transparent">
                                    {heading.split(' ').slice(-1)[0]}
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#325095]/30 to-[#6284bb]/30 blur-xl" />
                            </span>
                        </h2>
                    )}

                    {/* Subheading */}
                    {subheading && (
                        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                            {subheading}
                        </p>
                    )}

                    {/* CTA Buttons */}
                    {ctaPrimaryLabel && ctaPrimaryHref && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href={ctaPrimaryHref}>
                                <Button
                                    size="lg"
                                    className="group relative bg-[#325095] text-white hover:bg-[#284175] px-10 py-7 text-base font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(50,80,149,0.4)] hover:-translate-y-1"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {ctaPrimaryLabel}
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </Link>
                            <Link
                                href="/features"
                                className="group flex items-center gap-3 text-slate-500 hover:text-[#325095] transition-all duration-300"
                            >
                                <span className="text-base font-medium">{t?.secondaryLink || "Pelajari fitur lengkap"}</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    )}

                    {/* Floating elements */}
                    <div className="absolute top-20 left-10 w-20 h-20 border border-slate-200 rounded-full animate-float opacity-50" />
                    <div className="absolute bottom-20 right-10 w-32 h-32 border border-slate-100 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#325095] rounded-full animate-pulse" />
                    <div className="absolute top-1/3 left-20 w-2 h-2 bg-[#6284bb] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </div>
        </section>
    );
}
