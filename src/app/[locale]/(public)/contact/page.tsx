import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastProvider } from "@/components/ui/toast";
import prisma from "@/lib/prisma";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hubungi Kami - Present HRIS",
    description: "Hubungi tim Present untuk demo produk atau informasi lebih lanjut.",
};

async function getSiteSettings() {
    const settings = await prisma.siteSetting.findFirst();
    return settings;
}

export default async function ContactPage() {
    const settings = await getSiteSettings();

    return (
        <ToastProvider>
            <div className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                            Hubungi Kami
                        </h1>
                        <p className="text-lg text-[#475569] max-w-2xl mx-auto">
                            Tertarik dengan Present HRIS? Jadwalkan demo gratis atau hubungi kami untuk informasi lebih lanjut.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kirim Pesan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Kontak</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {settings?.address && (
                                        <div className="flex gap-3">
                                            <MapPin className="h-5 w-5 text-[#1E40AF] shrink-0 mt-0.5" />
                                            <p className="text-sm text-[#475569]">{settings.address}</p>
                                        </div>
                                    )}
                                    {settings?.email && (
                                        <div className="flex gap-3">
                                            <Mail className="h-5 w-5 text-[#1E40AF] shrink-0" />
                                            <a
                                                href={`mailto:${settings.email}`}
                                                className="text-sm text-[#475569] hover:text-[#1E40AF]"
                                            >
                                                {settings.email}
                                            </a>
                                        </div>
                                    )}
                                    {settings?.whatsappLink && (
                                        <div className="flex gap-3">
                                            <MessageCircle className="h-5 w-5 text-[#1E40AF] shrink-0" />
                                            <a
                                                href={settings.whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-[#475569] hover:text-[#1E40AF]"
                                            >
                                                Chat via WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {settings?.mapEmbedHtml && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Lokasi</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="rounded-lg overflow-hidden aspect-video"
                                            dangerouslySetInnerHTML={{ __html: settings.mapEmbedHtml }}
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToastProvider>
    );
}
