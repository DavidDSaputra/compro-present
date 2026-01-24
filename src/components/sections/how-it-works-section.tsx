"use client";

import { useEffect, useRef, useState } from "react";
import {
    UserPlus,
    Settings,
    Rocket,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { Dictionary } from "@/dictionaries";

interface HowItWorksItem {
    id: string;
    title: string | null;
    subtitle: string | null;
    tag: string | null;
}

interface HowItWorksSectionProps {
    heading: string | null;
    subheading: string | null;
    items: HowItWorksItem[];
    dictionary?: Dictionary;
}

const defaultSteps = [
    {
        id: "1",
        title: "Konsultasi & Analisis",
        subtitle: "Tim kami akan menganalisis kebutuhan HR perusahaan Anda dan memberikan solusi terbaik.",
        tag: "Step 1",
    },
    {
        id: "2",
        title: "Setup & Konfigurasi",
        subtitle: "Kami membantu setup sistem, import data karyawan, dan konfigurasi sesuai kebijakan perusahaan.",
        tag: "Step 2",
    },
    {
        id: "3",
        title: "Training & Go-Live",
        subtitle: "Pelatihan lengkap untuk tim HR Anda dan pendampingan hingga sistem berjalan lancar.",
        tag: "Step 3",
    },
    {
        id: "4",
        title: "Support Berkelanjutan",
        subtitle: "Dukungan teknis 24/7 dan update berkala untuk memastikan sistem selalu optimal.",
        tag: "Step 4",
    },
];

const iconMap: Record<number, React.ReactNode> = {
    0: <UserPlus className="h-6 w-6" />,
    1: <Settings className="h-6 w-6" />,
    2: <Rocket className="h-6 w-6" />,
    3: <CheckCircle2 className="h-6 w-6" />,
};

export function HowItWorksSection({
    heading,
    subheading,
    items,
    dictionary,
}: HowItWorksSectionProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const t = dictionary?.howItWorks;

    const steps = items.length > 0 ? items : defaultSteps;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-advance steps
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isVisible, steps.length]);

    return (
        <section
            ref={sectionRef}
            className="py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#325095]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7a9ece]/10 rounded-full blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#325095]/5 border border-[#325095]/10 mb-6">
                        <span className="text-sm font-semibold text-[#325095]">
                            {t?.badge || "Proses Mudah & Cepat"}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        {t?.heading || heading || "Bagaimana Cara Kerjanya?"}
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {t?.subheading || subheading || "Empat langkah mudah untuk memulai transformasi digital HR perusahaan Anda"}
                    </p>
                </div>

                {/* Desktop Timeline */}
                <div className="hidden lg:block">
                    {/* Progress Line */}
                    <div className="relative mb-16">
                        <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full" />
                        <div
                            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#325095] to-[#6284bb] rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        />

                        {/* Step Indicators */}
                        <div className="relative flex justify-between">
                            {steps.map((step, index) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={`group flex flex-col items-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    {/* Circle Indicator */}
                                    <div
                                        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${index <= activeStep
                                            ? 'bg-gradient-to-br from-[#325095] to-[#6284bb] text-white shadow-lg shadow-[#325095]/30 scale-110'
                                            : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-[#325095]/50 group-hover:text-[#325095]'
                                            }`}
                                    >
                                        {iconMap[index] || <span className="font-bold">{index + 1}</span>}

                                        {/* Pulse Animation for Active */}
                                        {index === activeStep && (
                                            <span className="absolute inset-0 rounded-full bg-[#325095] animate-ping opacity-25" />
                                        )}
                                    </div>

                                    {/* Step Label */}
                                    <span
                                        className={`mt-4 text-sm font-semibold transition-colors duration-300 ${index <= activeStep ? 'text-[#325095]' : 'text-slate-400'
                                            }`}
                                    >
                                        {step.tag || `Step ${index + 1}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Card */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${activeStep * 100}%)` }}
                        >
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className={`max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 ${index === activeStep ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
                                        }`}>
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#325095] to-[#6284bb] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#325095]/20">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                                    {step.title}
                                                </h3>
                                                <p className="text-slate-500 text-lg leading-relaxed">
                                                    {step.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Dots */}
                                        <div className="flex items-center justify-center gap-2 mt-8">
                                            {steps.map((_, dotIndex) => (
                                                <button
                                                    key={dotIndex}
                                                    onClick={() => setActiveStep(dotIndex)}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${dotIndex === activeStep
                                                        ? 'bg-[#325095] w-8'
                                                        : 'bg-slate-300 hover:bg-slate-400'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet Version */}
                <div className="lg:hidden space-y-6">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                                }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-[#325095] to-transparent" />
                            )}

                            <div className="flex gap-5">
                                {/* Step Number Circle */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#325095] to-[#6284bb] flex items-center justify-center text-white font-bold shadow-lg shadow-[#325095]/30">
                                        {iconMap[index] || index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg shadow-slate-100 border border-slate-100">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#325095] bg-[#325095]/10 rounded-full mb-3">
                                        {step.tag || `Step ${index + 1}`}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        {step.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#325095] to-[#4a6aa8] text-white font-semibold rounded-full shadow-lg shadow-[#325095]/30 hover:shadow-xl hover:shadow-[#325095]/40 hover:-translate-y-1 transition-all duration-300"
                    >
                        {t?.cta || "Mulai Sekarang"}
                        <ArrowRight className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
