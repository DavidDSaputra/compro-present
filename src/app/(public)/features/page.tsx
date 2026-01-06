import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Clock,
    Wallet,
    TrendingUp,
    UserPlus,
    Smartphone,
    FileText,
    Calendar,
    BarChart3,
    Shield,
    Bell,
    Settings,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fitur - Present HRIS",
    description: "Jelajahi semua fitur Present HRIS untuk mengelola SDM perusahaan Anda.",
};

const features = [
    {
        icon: Users,
        title: "HRIS Core",
        description: "Kelola data karyawan, struktur organisasi, dan dokumen HR dalam satu platform terintegrasi.",
        tag: "Core",
    },
    {
        icon: Clock,
        title: "Attendance Management",
        description: "Sistem absensi canggih dengan face recognition, geolocation, dan integrasi mesin fingerprint.",
        tag: "Time",
    },
    {
        icon: Wallet,
        title: "Payroll",
        description: "Penggajian otomatis dengan perhitungan PPh21, BPJS, dan komponen salary lainnya.",
        tag: "Finance",
    },
    {
        icon: TrendingUp,
        title: "Performance Management",
        description: "Kelola KPI, OKR, dan performance review dengan dashboard analytics yang powerful.",
        tag: "Growth",
    },
    {
        icon: UserPlus,
        title: "Recruitment",
        description: "Dari job posting hingga onboarding, kelola proses rekrutmen dengan mudah dan efisien.",
        tag: "Talent",
    },
    {
        icon: Smartphone,
        title: "Mobile HR App",
        description: "Akses HR di mana saja dengan aplikasi mobile untuk iOS dan Android.",
        tag: "Mobile",
    },
    {
        icon: FileText,
        title: "Document Management",
        description: "Simpan dan kelola dokumen karyawan secara digital dengan keamanan tingkat enterprise.",
        tag: "Document",
    },
    {
        icon: Calendar,
        title: "Leave Management",
        description: "Kelola cuti, izin, dan kalender kerja dengan approval workflow yang fleksibel.",
        tag: "Time",
    },
    {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description: "Dashboard real-time dan laporan komprehensif untuk pengambilan keputusan berbasis data.",
        tag: "Analytics",
    },
    {
        icon: Shield,
        title: "Compliance",
        description: "Pastikan kepatuhan terhadap regulasi ketenagakerjaan Indonesia dengan fitur compliance.",
        tag: "Legal",
    },
    {
        icon: Bell,
        title: "Notifications",
        description: "Notifikasi real-time via email, push notification, dan in-app untuk semua aktivitas HR.",
        tag: "Communication",
    },
    {
        icon: Settings,
        title: "Customization",
        description: "Kustomisasi workflow, form, dan field sesuai kebutuhan unik perusahaan Anda.",
        tag: "Admin",
    },
];

export default function FeaturesPage() {
    return (
        <div className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                        Fitur Lengkap untuk Semua Kebutuhan HR
                    </h1>
                    <p className="text-lg text-[#475569] max-w-2xl mx-auto">
                        Present menyediakan solusi end-to-end untuk manajemen SDM perusahaan Anda, dari rekrutmen hingga pensiun.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-lg hover:border-[#1E40AF]/20 transition-all duration-300"
                        >
                            <CardHeader>
                                <div className="mb-4 p-3 rounded-xl bg-[#DBEAFE] w-fit">
                                    <feature.icon className="h-6 w-6 text-[#1E40AF]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    <Badge>{feature.tag}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#475569]">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
