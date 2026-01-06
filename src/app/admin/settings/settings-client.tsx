"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateSiteSettings } from "@/actions/settings";
import { Loader2 } from "lucide-react";
import { useToast, ToastProvider } from "@/components/ui/toast";

interface SiteSetting {
    id: string;
    companyName: string;
    logoUrl: string | null;
    address: string | null;
    email: string | null;
    whatsappLink: string | null;
    mapEmbedHtml: string | null;
}

interface SettingsClientProps {
    settings: SiteSetting | null;
}

export default function SettingsClient({ settings }: SettingsClientProps) {
    return (
        <ToastProvider>
            <SettingsContent settings={settings} />
        </ToastProvider>
    );
}

function SettingsContent({ settings }: SettingsClientProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: settings?.companyName || "",
        logoUrl: settings?.logoUrl || "",
        address: settings?.address || "",
        email: settings?.email || "",
        whatsappLink: settings?.whatsappLink || "",
        mapEmbedHtml: settings?.mapEmbedHtml || "",
    });
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.companyName) {
            addToast("Nama perusahaan wajib diisi", "error");
            return;
        }

        setIsLoading(true);
        try {
            await updateSiteSettings(formData);
            addToast("Pengaturan berhasil disimpan", "success");
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">Pengaturan Situs</h1>
                <p className="text-[#475569]">Kelola informasi umum website</p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Perusahaan</CardTitle>
                        <CardDescription>
                            Data ini akan ditampilkan di footer dan halaman kontak
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Nama Perusahaan *"
                                value={formData.companyName}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyName: e.target.value })
                                }
                                placeholder="Present"
                            />
                            <Input
                                label="Logo URL"
                                value={formData.logoUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, logoUrl: e.target.value })
                                }
                                placeholder="/logo-present.png"
                            />
                        </div>

                        <Textarea
                            label="Alamat"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Alamat lengkap perusahaan"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="hello@present.co.id"
                            />
                            <Input
                                label="Link WhatsApp"
                                value={formData.whatsappLink}
                                onChange={(e) =>
                                    setFormData({ ...formData, whatsappLink: e.target.value })
                                }
                                placeholder="https://wa.me/6281234567890"
                            />
                        </div>

                        <Textarea
                            label="Embed Map (HTML)"
                            value={formData.mapEmbedHtml}
                            onChange={(e) =>
                                setFormData({ ...formData, mapEmbedHtml: e.target.value })
                            }
                            placeholder='<iframe src="..."></iframe>'
                            rows={4}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    "Simpan Perubahan"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
