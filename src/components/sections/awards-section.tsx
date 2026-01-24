import { Award } from "lucide-react";

interface AwardItem {
    id: string;
    title: string | null;
    subtitle: string | null;
}

interface AwardsSectionProps {
    heading: string | null;
    items: AwardItem[];
}

export function AwardsSection({ heading, items }: AwardsSectionProps) {
    return (
        <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 lg:px-8">
                {heading && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16 animate-fade-in-up">
                        {heading}
                    </h2>
                )}

                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-[#325095]/30 transition-all duration-300 transform hover:-translate-y-2 group animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="p-4 bg-white rounded-full shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Award className="h-8 w-8 text-[#325095]" />
                            </div>
                            <p className="font-bold text-slate-900 text-lg mb-2">{item.title}</p>
                            <p className="text-sm text-slate-500 font-medium">{item.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
