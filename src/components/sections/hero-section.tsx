import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";

interface HeroSectionProps {
    heading: string | null;
    subheading: string | null;
    ctaPrimaryLabel: string | null;
    ctaPrimaryHref: string | null;
    ctaSecondaryLabel: string | null;
    ctaSecondaryHref: string | null;
    imageUrl: string | null;
}

export function HeroSection({
    heading,
    subheading,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref,
}: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-white pt-24 lg:pt-28 pb-20 lg:pb-0">
            {/* Ambient Background Effects - Light Theme */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="container relative mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                        {/* Trust/Announcement Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-blue-50 border border-blue-100 mb-8 hover:bg-blue-100 transition-colors cursor-default animate-fade-in-up" style={{ animationDelay: '0s' }}>
                            <span className="text-sm font-semibold text-blue-700">Platform HRIS & Payroll Terintegrasi</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.2] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {heading?.split('Present HRIS').map((part, i) => (
                                i === 0 ? part : <span key="brand" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x">Present HRIS</span>
                            )) || heading}
                        </h1>

                        {/* Subheading */}
                        <p className="text-base md:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {subheading}
                        </p>

                        {/* CTA Group */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {ctaPrimaryLabel && ctaPrimaryHref && (
                                <Link href={ctaPrimaryHref} className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                                        Hubungi Kami
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            )}
                            {ctaSecondaryLabel && ctaSecondaryHref && (
                                <Link href={ctaSecondaryHref} className="w-full sm:w-auto">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-medium border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all duration-300">
                                        <PlayCircle className="mr-2 h-5 w-5" />
                                        {ctaSecondaryLabel}
                                    </Button>
                                </Link>
                            )}
                        </div>


                    </div>

                    {/* Right Column: Hero Image / Visual */}
                    <div className="relative z-10 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[80px] -z-10 animate-pulse" />

                        {/* Main Image with floating animation */}
                        <div className="relative animate-float w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                            <Image
                                src="/present-hr-the-all-in-one-hris-p.png"
                                alt="Present HRIS Dashboard Interface"
                                width={800}
                                height={800}
                                className="w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
