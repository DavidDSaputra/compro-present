import { getPageBySlug } from "@/actions/pages";
import { notFound } from "next/navigation";
import SectionsClient from "./sections-client";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function SectionsPage({ params }: Props) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <SectionsClient
            page={{ id: page.id, slug: page.slug, title: page.title }}
            initialSections={page.sections.map((s) => ({
                ...s,
                _count: { items: s.items.length },
            }))}
        />
    );
}
