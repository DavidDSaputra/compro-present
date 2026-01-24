"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/lib/i18n-config";
import { Dictionary } from "@/dictionaries";

interface CookieConsentProps {
    locale: Locale;
    dictionary: Dictionary;
}

export function CookieConsent({ locale, dictionary }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false);
    const t = dictionary;

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setIsVisible(false);
    };

    const handleCustomize = () => {
        // For now, just accept - you can expand this to show a modal
        localStorage.setItem("cookie-consent", "customized");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
            role="dialog"
            aria-label="Cookie consent"
        >
            <div className="bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
                <div className="container mx-auto px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Text Content */}
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-[#0F172A] mb-1">
                                {t.cookieConsent.title}
                            </h3>
                            <p className="text-sm text-[#475569] leading-relaxed">
                                {t.cookieConsent.description}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shrink-0">
                            <button
                                onClick={handleCustomize}
                                className="px-5 py-2.5 text-sm font-medium text-[#475569] bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200"
                            >
                                {t.cookieConsent.customize}
                            </button>
                            <button
                                onClick={handleRejectAll}
                                className="px-5 py-2.5 text-sm font-medium text-[#475569] bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200"
                            >
                                {t.cookieConsent.rejectAll}
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-[#1E40AF] rounded-lg hover:bg-[#1E3A8A] transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                {t.cookieConsent.acceptAll}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
