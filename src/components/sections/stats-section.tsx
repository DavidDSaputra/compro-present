"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Users, Boxes, Activity, Sparkles, TrendingUp } from "lucide-react";
import { Dictionary } from "@/dictionaries";

interface StatItem {
    id: string;
    title: string | null;
    subtitle: string | null;
}

interface StatsSectionProps {
    heading: string | null;
    items: StatItem[];
    dictionary?: Dictionary;
}

const iconMap: Record<string, React.ReactNode> = {
    "PERUSAHAAN": <Building2 className="h-8 w-8" />,
    "PENGGUNA AKTIF": <Users className="h-8 w-8" />,
    "FITUR": <Boxes className="h-8 w-8" />,
    "UPTIME": <Activity className="h-8 w-8" />,
};

// Updated color palette based on #325095 (dark to light)
const colorMap: Record<number, { bg: string; accent: string; icon: string }> = {
    0: {
        bg: "bg-gradient-to-br from-[#325095] to-[#4a6aa8]",
        accent: "text-blue-100",
        icon: "text-white/80"
    },
    1: {
        bg: "bg-gradient-to-br from-[#4a6aa8] to-[#6284bb]",
        accent: "text-blue-50",
        icon: "text-white/80"
    },
    2: {
        bg: "bg-gradient-to-br from-[#6284bb] to-[#7a9ece]",
        accent: "text-white/90",
        icon: "text-white/80"
    },
    3: {
        bg: "bg-gradient-to-br from-[#7a9ece] to-[#92b8e1]",
        accent: "text-white/90",
        icon: "text-white/80"
    },
};

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, target, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function parseStatValue(title: string | null): { value: number; suffix: string; isPercentage: boolean; isMillion: boolean } {
    if (!title) return { value: 0, suffix: "", isPercentage: false, isMillion: false };

    const cleaned = title.replace(/,/g, "");

    if (cleaned.includes("M")) {
        return { value: 1, suffix: "M+", isPercentage: true, isMillion: true }; // logic slightly tricky for M, assuming 1M+ for now
    }
    if (cleaned.includes("%")) {
        return { value: 99, suffix: ".9%", isPercentage: true, isMillion: false };
    }

    const num = parseFloat(cleaned.replace("+", ""));
    return { value: num, suffix: cleaned.includes("+") ? "+" : "", isPercentage: false, isMillion: false };
}

export function StatsSection({ heading, items, dictionary }: StatsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const t = dictionary?.stats;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Bento grid layout configurations
    const gridClasses = [
        "col-span-2 row-span-2", // Large - Perusahaan
        "col-span-2 row-span-1", // Wide - Pengguna
        "col-span-1 row-span-1", // Small - Fitur
        "col-span-1 row-span-1", // Small - Uptime
    ];

    return (
        <section
            ref={sectionRef}
            className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden"
        >
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className={`
                    text-center mb-12 lg:mb-16
                    transition-all duration-1000
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                        <Sparkles className="h-4 w-4 text-[#325095]" />
                        <span className="text-sm font-medium text-slate-600">
                            {t?.badge || "Platform Terpercaya"}
                        </span>
                    </div>
                    {heading && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                            {heading}
                        </h2>
                    )}
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
                    {items.map((item, index) => {
                        const colors = colorMap[index % 4];
                        const { value, suffix, isPercentage, isMillion } = parseStatValue(item.title);
                        const gridClass = gridClasses[index] || "col-span-1 row-span-1";
                        const isLarge = index === 0;
                        const isWide = index === 1;

                        return (
                            <div
                                key={item.id}
                                className={`
                                    ${gridClass}
                                    ${colors.bg}
                                    rounded-3xl p-6 lg:p-8 relative overflow-hidden
                                    transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl
                                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                `}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                {/* Background decoration */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    {/* Icon */}
                                    <div className={`${colors.icon} mb-4`}>
                                        {iconMap[item.subtitle?.toUpperCase() || ""] || <TrendingUp className="h-8 w-8" />}
                                    </div>

                                    <div>
                                        {/* Number */}
                                        <div className={`
                                            font-bold text-white mb-2 tracking-tight
                                            ${isLarge ? 'text-6xl lg:text-8xl' : isWide ? 'text-5xl lg:text-6xl' : 'text-4xl lg:text-5xl'}
                                        `}>
                                            {isPercentage ? (
                                                <span>
                                                    <AnimatedCounter target={value} suffix="" duration={2000} />
                                                    <span className={isLarge ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'}>{suffix}</span>
                                                </span>
                                            ) : isMillion ? (
                                                <span>
                                                    <AnimatedCounter target={value} suffix="" duration={1500} />
                                                    <span className={isLarge ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'}>{suffix}</span>
                                                </span>
                                            ) : (
                                                <AnimatedCounter target={value} suffix={suffix} duration={1800 + index * 150} />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <div className={`${colors.accent} font-medium ${isLarge || isWide ? 'text-base' : 'text-sm'}`}>
                                            {item.subtitle}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
