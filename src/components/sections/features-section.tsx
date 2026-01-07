"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Clock,
    Wallet,
    TrendingUp,
    UserPlus,
    Smartphone,
    ArrowRight,
} from "lucide-react";

interface FeatureItem {
    id: string;
    title: string | null;
    subtitle: string | null;
    tag: string | null;
}

interface FeaturesSectionProps {
    heading: string | null;
    subheading: string | null;
    items: FeatureItem[];
}

const iconMap: Record<string, React.ReactNode> = {
    "HRIS Core": <Users className="h-7 w-7" />,
    "Attendance": <Clock className="h-7 w-7" />,
    "Payroll": <Wallet className="h-7 w-7" />,
    "Performance": <TrendingUp className="h-7 w-7" />,
    "Recruitment": <UserPlus className="h-7 w-7" />,
    "Mobile App": <Smartphone className="h-7 w-7" />,
};

const gradientColors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-orange-500 to-yellow-400",
    "from-green-500 to-emerald-400",
    "from-indigo-500 to-blue-400",
    "from-rose-500 to-red-400",
];

export function FeaturesSection({ heading, subheading, items }: FeaturesSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

    return (
        <section
            ref={sectionRef}
            className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden relative"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                            Fitur Lengkap
                        </span>
                    </div>
                    {heading && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            {heading}
                        </h2>
                    )}
                    {subheading && (
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            {subheading}
                        </p>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`group relative transition-all duration-700 ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className={`
                                relative bg-white rounded-3xl p-8 h-full
                                border border-slate-100 
                                transition-all duration-500 ease-out
                                ${hoveredIndex === index
                                    ? 'shadow-2xl shadow-slate-200/50 -translate-y-3 border-transparent'
                                    : 'shadow-sm hover:shadow-lg'
                                }
                            `}>
                                {/* Gradient border on hover */}
                                <div className={`
                                    absolute inset-0 rounded-3xl bg-gradient-to-br ${gradientColors[index % gradientColors.length]} 
                                    opacity-0 transition-opacity duration-500 -z-10
                                    ${hoveredIndex === index ? 'opacity-100' : ''}
                                `} style={{ padding: '2px' }}>
                                    <div className="w-full h-full bg-white rounded-3xl" />
                                </div>

                                {/* Icon with animated background */}
                                <div className="relative mb-6">
                                    <div className={`
                                        inline-flex p-4 rounded-2xl transition-all duration-500
                                        ${hoveredIndex === index
                                            ? `bg-gradient-to-br ${gradientColors[index % gradientColors.length]} text-white shadow-lg`
                                            : 'bg-slate-100 text-slate-700'
                                        }
                                    `}>
                                        {iconMap[item.title || ""] || <Users className="h-7 w-7" />}
                                    </div>

                                    {/* Floating particles on hover */}
                                    <div className={`
                                        absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400/30
                                        transition-all duration-500
                                        ${hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                                    `} />
                                    <div className={`
                                        absolute top-4 -right-4 w-2 h-2 rounded-full bg-purple-400/40
                                        transition-all duration-700 delay-100
                                        ${hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                                    `} />
                                </div>

                                {/* Title & Badge */}
                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                    <h3 className={`
                                        text-xl font-bold transition-colors duration-300
                                        ${hoveredIndex === index ? 'text-slate-900' : 'text-slate-800'}
                                    `}>
                                        {item.title}
                                    </h3>
                                    {item.tag && (
                                        <Badge
                                            variant="secondary"
                                            className={`
                                                transition-all duration-300 border-0
                                                ${hoveredIndex === index
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-slate-100 text-slate-600'
                                                }
                                            `}
                                        >
                                            {item.tag}
                                        </Badge>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-slate-500 leading-relaxed mb-6">
                                    {item.subtitle}
                                </p>

                                {/* Learn more link */}
                                <div className={`
                                    flex items-center gap-2 text-sm font-medium
                                    transition-all duration-300
                                    ${hoveredIndex === index
                                        ? 'text-blue-600 translate-x-0 opacity-100'
                                        : 'text-slate-400 -translate-x-2 opacity-0'
                                    }
                                `}>
                                    <span>Pelajari lebih lanjut</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`
                    text-center mt-16 transition-all duration-1000 delay-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    <p className="text-slate-500 mb-4">
                        Semua modul terintegrasi dalam satu platform yang mudah digunakan
                    </p>
                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all duration-300 cursor-pointer group">
                        <span>Lihat semua fitur</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </section>
    );
}
