import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Dictionary } from "@/dictionaries";

interface HeroSectionProps {
    heading: string | null;
    subheading: string | null;
    ctaPrimaryLabel: string | null;
    ctaPrimaryHref: string | null;
    ctaSecondaryLabel: string | null;
    ctaSecondaryHref: string | null;
    imageUrl: string | null;
    dictionary?: Dictionary;
}

export function HeroSection({
    heading,
    subheading,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref,
    dictionary,
}: HeroSectionProps) {
    // Use dictionary translations if available, otherwise fallback to props
    const t = dictionary?.hero;
    const badge = t?.badge || "Platform HRIS & Payroll Terintegrasi";
    const title = t?.title || heading || "Kelola SDM Lebih Cerdas dengan";
    const titleHighlight = t?.titleHighlight || "Present HRIS";
    const subtitle = t?.subtitle || subheading;
    const primaryLabel = t?.ctaPrimary || ctaPrimaryLabel || "Hubungi Kami";
    const secondaryLabel = t?.ctaSecondary || ctaSecondaryLabel || "Pelajari Lebih Lanjut";

    // Default hrefs if not provided
    const primaryHref = ctaPrimaryHref || "/contact";
    const secondaryHref = ctaSecondaryHref || "/features";

    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-white via-blue-50/30 to-white pt-24 lg:pt-28 pb-20 lg:pb-0">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#325095]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px]" />
            </div>

            <div className="container relative mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                        {/* Trust/Announcement Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#325095]/10 border border-[#325095]/20 mb-8 hover:bg-[#325095]/15 transition-colors cursor-default animate-fade-in-up" style={{ animationDelay: '0s' }}>
                            <span className="text-sm font-semibold text-[#325095]">{badge}</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {title}
                            <br />
                            <span
                                className="inline-block mt-2"
                                style={{
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #d946ef 70%, #ec4899 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {titleHighlight}
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-base md:text-lg text-slate-600 mb-10 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {subtitle}
                        </p>

                        {/* CTA Group */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <Link href={primaryHref} className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-[#325095] hover:bg-[#283f78] text-white shadow-lg shadow-[#325095]/25 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#325095]/35 rounded-xl">
                                    {primaryLabel}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href={secondaryHref} className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-medium border-2 border-slate-200 text-slate-700 hover:bg-[#325095]/5 hover:text-[#325095] hover:border-[#325095]/40 transition-all duration-300 rounded-xl">
                                    <PlayCircle className="mr-2 h-5 w-5" />
                                    {secondaryLabel}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Hero Image / Visual */}
                    <div className="relative z-10 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#325095]/10 to-blue-100/30 rounded-full blur-[80px] -z-10 animate-pulse" />

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



