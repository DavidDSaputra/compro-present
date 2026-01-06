interface StatItem {
    id: string;
    title: string | null;
    subtitle: string | null;
}

interface StatsSectionProps {
    heading: string | null;
    items: StatItem[];
}

export function StatsSection({ heading, items }: StatsSectionProps) {
    return (
        <section className="py-20 lg:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {heading && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16 animate-fade-in-up">
                        {heading}
                    </h2>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="text-center group animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.title}
                            </div>
                            <div className="text-slate-500 font-medium uppercase tracking-wider text-sm md:text-base">
                                {item.subtitle}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
