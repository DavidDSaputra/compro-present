import { HeroSection } from "./sections/hero-section";
import { LogoCloudSection } from "./sections/logo-cloud-section";
import { FeaturesSection } from "./sections/features-section";
import { StatsSection } from "./sections/stats-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { AwardsSection } from "./sections/awards-section";
import { CtaSection } from "./sections/cta-section";
import { HowItWorksSection } from "./sections/how-it-works-section";
import { ClientsSection } from "./sections/clients-section";
import { Dictionary } from "@/dictionaries";

interface SectionItem {
    id: string;
    title: string | null;
    subtitle: string | null;
    imageUrl: string | null;
    href: string | null;
    tag: string | null;
}

interface Section {
    id: string;
    type: string;
    heading: string | null;
    subheading: string | null;
    ctaPrimaryLabel: string | null;
    ctaPrimaryHref: string | null;
    ctaSecondaryLabel: string | null;
    ctaSecondaryHref: string | null;
    imageUrl: string | null;
    items: SectionItem[];
}

interface SectionRendererProps {
    sections: Section[];
    dictionary?: Dictionary;
}

export function SectionRenderer({ sections, dictionary }: SectionRendererProps) {
    return (
        <>
            {sections.map((section) => {
                switch (section.type) {
                    case "hero":
                        return (
                            <HeroSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                ctaPrimaryLabel={section.ctaPrimaryLabel}
                                ctaPrimaryHref={section.ctaPrimaryHref}
                                ctaSecondaryLabel={section.ctaSecondaryLabel}
                                ctaSecondaryHref={section.ctaSecondaryHref}
                                imageUrl={section.imageUrl}
                                dictionary={dictionary}
                            />
                        );
                    case "logo-cloud":
                    case "clients":
                        return (
                            <ClientsSection
                                key={section.id}
                                dictionary={dictionary}
                            />
                        );
                    case "features":
                        return (
                            <FeaturesSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                items={section.items}
                                dictionary={dictionary}
                            />
                        );
                    case "stats":
                        return (
                            <StatsSection
                                key={section.id}
                                heading={section.heading}
                                items={section.items}
                                dictionary={dictionary}
                            />
                        );
                    case "testimonials":
                        return (
                            <TestimonialsSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                items={section.items}
                                dictionary={dictionary}
                            />
                        );
                    case "awards":
                        return (
                            <AwardsSection
                                key={section.id}
                                heading={section.heading}
                                items={section.items}
                            />
                        );
                    case "cta":
                        return (
                            <CtaSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                ctaPrimaryLabel={section.ctaPrimaryLabel}
                                ctaPrimaryHref={section.ctaPrimaryHref}
                                dictionary={dictionary}
                            />
                        );
                    case "how-it-works":
                        return (
                            <HowItWorksSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                items={section.items}
                                dictionary={dictionary}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}
