import { getSectionWithItems } from "@/actions/items";
import { notFound } from "next/navigation";
import ItemsClient from "./items-client";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ItemsPage({ params }: Props) {
    const { id } = await params;
    const section = await getSectionWithItems(id);

    if (!section) {
        notFound();
    }

    return (
        <ItemsClient
            section={{
                id: section.id,
                type: section.type,
                heading: section.heading,
                page: {
                    slug: section.page.slug,
                    title: section.page.title,
                },
            }}
            initialItems={section.items}
        />
    );
}
