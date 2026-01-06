import { getPages } from "@/actions/pages";
import PagesClient from "./pages-client";

export default async function PagesPage() {
    const pages = await getPages();
    return <PagesClient initialPages={pages} />;
}
