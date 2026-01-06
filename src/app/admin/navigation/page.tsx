import { getNavigationItems } from "@/actions/navigation";
import NavigationClient from "./navigation-client";

export default async function NavigationPage() {
    const items = await getNavigationItems();
    return <NavigationClient initialItems={items} />;
}
