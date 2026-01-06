import { getSiteSettings } from "@/actions/settings";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
    const settings = await getSiteSettings();
    return <SettingsClient settings={settings} />;
}
