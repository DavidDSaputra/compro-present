import { HeroSection } from "./sections/hero-section";
import { LogoCloudSection } from "./sections/logo-cloud-section";
import { FeaturesSection } from "./sections/features-section";
import { StatsSection } from "./sections/stats-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { AwardsSection } from "./sections/awards-section";
import { CtaSection } from "./sections/cta-section";

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
}

export function SectionRenderer({ sections }: SectionRendererProps) {
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
                            />
                        );
                    case "logo-cloud":
                        return (
                            <LogoCloudSection
                                key={section.id}
                                heading={section.heading}
                                items={section.items}
                            />
                        );
                    case "features":
                        return (
                            <FeaturesSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                items={section.items}
                            />
                        );
                    case "stats":
                        return (
                            <StatsSection
                                key={section.id}
                                heading={section.heading}
                                items={section.items}
                            />
                        );
                    case "testimonials":
                        return (
                            <TestimonialsSection
                                key={section.id}
                                heading={section.heading}
                                subheading={section.subheading}
                                items={section.items}
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
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}
