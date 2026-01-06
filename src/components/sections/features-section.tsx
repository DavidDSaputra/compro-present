import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Clock,
    Wallet,
    TrendingUp,
    UserPlus,
    Smartphone,
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
    "HRIS Core": <Users className="h-8 w-8 text-[#1E40AF]" />,
    "Attendance": <Clock className="h-8 w-8 text-[#1E40AF]" />,
    "Payroll": <Wallet className="h-8 w-8 text-[#1E40AF]" />,
    "Performance": <TrendingUp className="h-8 w-8 text-[#1E40AF]" />,
    "Recruitment": <UserPlus className="h-8 w-8 text-[#1E40AF]" />,
    "Mobile App": <Smartphone className="h-8 w-8 text-[#1E40AF]" />,
};

export function FeaturesSection({ heading, subheading, items }: FeaturesSectionProps) {
    return (
        <section className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
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
                        <div
                            key={item.id}
                            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Decorative background blob */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="mb-6 inline-block p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors duration-500">
                                    <div className="text-blue-600 group-hover:text-white transition-colors duration-500">
                                        {iconMap[item.title || ""] || <Users className="h-6 w-6" />}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    {item.tag && (
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                                            {item.tag}
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
