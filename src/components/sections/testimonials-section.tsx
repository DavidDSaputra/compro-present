import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialItem {
    id: string;
    title: string | null;
    subtitle: string | null;
    tag: string | null;
}

interface TestimonialsSectionProps {
    heading: string | null;
    subheading: string | null;
    items: TestimonialItem[];
}

export function TestimonialsSection({
    heading,
    subheading,
    items,
}: TestimonialsSectionProps) {
    return (
        <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <Card
                            key={item.id}
                            className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up h-full"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <CardContent className="pt-8 px-8 pb-8 h-full flex flex-col">
                                <Quote className="h-10 w-10 text-blue-100 mb-6" />
                                <p className="text-slate-600 mb-8 italic text-lg leading-relaxed flex-grow">
                                    &ldquo;{item.subtitle}&rdquo;
                                </p>
                                <div className="border-t border-slate-100 pt-6 mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                            {item.title?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{item.title}</p>
                                            <p className="text-sm text-slate-500 font-medium">{item.tag}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
