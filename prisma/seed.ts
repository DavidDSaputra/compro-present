import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await hash("Admin123!", 12);

    await prisma.user.upsert({
        where: { email: "admin@present.test" },
        update: {},
        create: {
            name: "Administrator",
            email: "admin@present.test",
            passwordHash,
            role: "admin",
        },
    });

    await prisma.siteSetting.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            companyName: "Present",
            logoUrl: "/logo-present.png",
            address: "Gedung Cyber 2, Lantai 15, Jl. HR. Rasuna Said Blok X-5 Kav. 13, Jakarta Selatan 12950",
            email: "hello@present.co.id",
            whatsappLink: "https://wa.me/6281234567890",
            mapEmbedHtml: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904!2d106.8308!3d-6.2358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMDkuMCJTIDEwNsKwNDknNTEuMCJF!5e0!3m2!1sen!2sid!4v1234567890" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        },
    });

    const mainNav = await prisma.navigation.upsert({
        where: { id: "main" },
        update: {},
        create: {
            id: "main",
            name: "Main Navigation",
        },
    });

    const navItems = [
        {
            id: "produk",
            label: "Produk",
            type: "mega",
            order: 1,
            children: [
                { label: "Present HRIS Core", href: "/products/hris-core", order: 1 },
                { label: "Attendance", href: "/products/attendance", order: 2 },
                { label: "Payroll", href: "/products/payroll", order: 3 },
                { label: "Performance", href: "/products/performance", order: 4 },
                { label: "Recruitment", href: "/products/recruitment", order: 5 },
                { label: "Mobile HR App", href: "/products/mobile-app", order: 6 },
            ],
        },
        {
            id: "solusi",
            label: "Solusi",
            type: "mega",
            order: 2,
            children: [
                { label: "Enterprise", href: "/solutions/enterprise", order: 1 },
                { label: "Manufacturing", href: "/solutions/manufacturing", order: 2 },
                { label: "Retail", href: "/solutions/retail", order: 3 },
                { label: "Services", href: "/solutions/services", order: 4 },
            ],
        },
        {
            id: "fitur",
            label: "Fitur",
            href: "/features",
            type: "link",
            order: 3,
        },
        {
            id: "pelanggan",
            label: "Pelanggan",
            type: "dropdown",
            order: 4,
            children: [
                { label: "Customer Stories", href: "/customers/stories", order: 1 },
                { label: "Testimoni", href: "/customers/testimonials", order: 2 },
                { label: "Logo Klien", href: "/customers/clients", order: 3 },
            ],
        },
        {
            id: "resources",
            label: "Resources",
            type: "dropdown",
            order: 5,
            children: [
                { label: "Blog", href: "/blog", order: 1 },
                { label: "Webinar/Event", href: "/events", order: 2 },
                { label: "E-book/Whitepaper", href: "/resources/ebooks", order: 3 },
                { label: "FAQ", href: "/faq", order: 4 },
            ],
        },
        {
            id: "tentang",
            label: "Tentang Kami",
            type: "dropdown",
            order: 6,
            children: [
                { label: "Profil Present", href: "/about", order: 1 },
                { label: "Karier", href: "/careers", order: 2 },
                { label: "Kontak", href: "/contact", order: 3 },
            ],
        },
        {
            id: "hubungi",
            label: "Hubungi Kami",
            href: "/contact",
            type: "link",
            order: 7,
        },
        {
            id: "cta",
            label: "Jadwalkan Demo",
            href: "/contact",
            type: "cta",
            order: 8,
        },
    ];

    for (const item of navItems) {
        const parent = await prisma.navigationItem.upsert({
            where: { id: item.id },
            update: { label: item.label, href: item.href, type: item.type, order: item.order },
            create: {
                id: item.id,
                navigationId: mainNav.id,
                label: item.label,
                href: item.href,
                type: item.type,
                order: item.order,
            },
        });

        if (item.children) {
            for (const child of item.children) {
                const childId = `${item.id}-${child.order}`;
                await prisma.navigationItem.upsert({
                    where: { id: childId },
                    update: { label: child.label, href: child.href, order: child.order },
                    create: {
                        id: childId,
                        navigationId: mainNav.id,
                        parentId: parent.id,
                        label: child.label,
                        href: child.href,
                        type: "link",
                        order: child.order,
                    },
                });
            }
        }
    }

    const homePage = await prisma.page.upsert({
        where: { slug: "home" },
        update: {},
        create: {
            slug: "home",
            title: "Present - Solusi HRIS Terdepan Indonesia",
        },
    });

    const heroSection = await prisma.section.upsert({
        where: { id: "home-hero" },
        update: {
            heading: "Kelola SDM Lebih Cerdas dengan Present HRIS",
            subheading: "Platform HRIS terintegrasi untuk mengelola karyawan, absensi, penggajian, dan performa dalam satu sistem yang powerful.",
            ctaPrimaryLabel: "Hubungi Kami",
            ctaPrimaryHref: "/contact",
            ctaSecondaryLabel: "Pelajari Lebih Lanjut",
            ctaSecondaryHref: "/features",
            imageUrl: "/hero-image.png",
        },
        create: {
            id: "home-hero",
            pageId: homePage.id,
            type: "hero",
            heading: "Kelola SDM Lebih Cerdas dengan Present HRIS",
            subheading: "Platform HRIS terintegrasi untuk mengelola karyawan, absensi, penggajian, dan performa dalam satu sistem yang powerful.",
            ctaPrimaryLabel: "Hubungi Kami",
            ctaPrimaryHref: "/contact",
            ctaSecondaryLabel: "Pelajari Lebih Lanjut",
            ctaSecondaryHref: "/features",
            imageUrl: "/hero-image.png",
            order: 1,
        },
    });

    const logoCloudSection = await prisma.section.upsert({
        where: { id: "home-logos" },
        update: {},
        create: {
            id: "home-logos",
            pageId: homePage.id,
            type: "logo-cloud",
            heading: "Dipercaya oleh 500+ Perusahaan Terkemuka",
            order: 2,
        },
    });

    const logoCloudItems = [
        { title: "Bank Mandiri", imageUrl: "/logos/mandiri.png" },
        { title: "Telkom Indonesia", imageUrl: "/logos/telkom.png" },
        { title: "Astra International", imageUrl: "/logos/astra.png" },
        { title: "Unilever", imageUrl: "/logos/unilever.png" },
        { title: "Garuda Indonesia", imageUrl: "/logos/garuda.png" },
        { title: "Pertamina", imageUrl: "/logos/pertamina.png" },
    ];

    for (let i = 0; i < logoCloudItems.length; i++) {
        const item = logoCloudItems[i];
        await prisma.sectionItem.upsert({
            where: { id: `logo-${i + 1}` },
            update: {},
            create: {
                id: `logo-${i + 1}`,
                sectionId: logoCloudSection.id,
                title: item.title,
                imageUrl: item.imageUrl,
                order: i + 1,
            },
        });
    }

    const featuresSection = await prisma.section.upsert({
        where: { id: "home-features" },
        update: {},
        create: {
            id: "home-features",
            pageId: homePage.id,
            type: "features",
            heading: "Modul Lengkap untuk Semua Kebutuhan HR",
            subheading: "Dari rekrutmen hingga pensiun, Present menyediakan solusi end-to-end untuk manajemen SDM perusahaan Anda.",
            order: 3,
        },
    });

    const featureItems = [
        { title: "HRIS Core", subtitle: "Kelola data karyawan, struktur organisasi, dan dokumen HR dalam satu platform terintegrasi.", tag: "Core" },
        { title: "Attendance", subtitle: "Sistem absensi canggih dengan face recognition, geolocation, dan integrasi mesin fingerprint.", tag: "Time" },
        { title: "Payroll", subtitle: "Penggajian otomatis dengan perhitungan PPh21, BPJS, dan komponen salary lainnya.", tag: "Finance" },
        { title: "Performance", subtitle: "Kelola KPI, OKR, dan performance review dengan dashboard analytics yang powerful.", tag: "Growth" },
        { title: "Recruitment", subtitle: "Dari job posting hingga onboarding, kelola proses rekrutmen dengan mudah.", tag: "Talent" },
        { title: "Mobile App", subtitle: "Akses HR di mana saja dengan aplikasi mobile untuk iOS dan Android.", tag: "Mobile" },
    ];

    for (let i = 0; i < featureItems.length; i++) {
        const item = featureItems[i];
        await prisma.sectionItem.upsert({
            where: { id: `feature-${i + 1}` },
            update: {},
            create: {
                id: `feature-${i + 1}`,
                sectionId: featuresSection.id,
                title: item.title,
                subtitle: item.subtitle,
                tag: item.tag,
                order: i + 1,
            },
        });
    }

    const statsSection = await prisma.section.upsert({
        where: { id: "home-stats" },
        update: {},
        create: {
            id: "home-stats",
            pageId: homePage.id,
            type: "stats",
            heading: "Present dalam Angka",
            order: 4,
        },
    });

    const statsItems = [
        { title: "500+", subtitle: "Perusahaan" },
        { title: "1M+", subtitle: "Pengguna Aktif" },
        { title: "50+", subtitle: "Fitur" },
        { title: "99.9%", subtitle: "Uptime" },
    ];

    for (let i = 0; i < statsItems.length; i++) {
        const item = statsItems[i];
        await prisma.sectionItem.upsert({
            where: { id: `stat-${i + 1}` },
            update: {},
            create: {
                id: `stat-${i + 1}`,
                sectionId: statsSection.id,
                title: item.title,
                subtitle: item.subtitle,
                order: i + 1,
            },
        });
    }

    const testimonialsSection = await prisma.section.upsert({
        where: { id: "home-testimonials" },
        update: {},
        create: {
            id: "home-testimonials",
            pageId: homePage.id,
            type: "testimonials",
            heading: "Apa Kata Mereka?",
            subheading: "Dengarkan langsung dari pelanggan kami yang telah merasakan manfaat Present.",
            order: 5,
        },
    });

    const testimonialItems = [
        { title: "Budi Santoso", subtitle: "Present mengubah cara kami mengelola HR. Proses yang dulu memakan waktu berhari-hari kini selesai dalam hitungan menit.", tag: "HR Director, PT Maju Bersama" },
        { title: "Siti Rahayu", subtitle: "Fitur payroll yang akurat dan laporan yang komprehensif sangat membantu tim finance kami.", tag: "Finance Manager, CV Sejahtera" },
        { title: "Agus Wijaya", subtitle: "Implementasi yang smooth dan tim support yang responsif. Highly recommended!", tag: "CEO, Startup Nusantara" },
    ];

    for (let i = 0; i < testimonialItems.length; i++) {
        const item = testimonialItems[i];
        await prisma.sectionItem.upsert({
            where: { id: `testimonial-${i + 1}` },
            update: {},
            create: {
                id: `testimonial-${i + 1}`,
                sectionId: testimonialsSection.id,
                title: item.title,
                subtitle: item.subtitle,
                tag: item.tag,
                order: i + 1,
            },
        });
    }

    const awardsSection = await prisma.section.upsert({
        where: { id: "home-awards" },
        update: {},
        create: {
            id: "home-awards",
            pageId: homePage.id,
            type: "awards",
            heading: "Penghargaan & Sertifikasi",
            order: 6,
        },
    });

    const awardItems = [
        { title: "ISO 27001", subtitle: "Information Security Management" },
        { title: "Best HRIS 2024", subtitle: "Indonesia Technology Awards" },
        { title: "Top 10 SaaS", subtitle: "Southeast Asia Tech Review" },
    ];

    for (let i = 0; i < awardItems.length; i++) {
        const item = awardItems[i];
        await prisma.sectionItem.upsert({
            where: { id: `award-${i + 1}` },
            update: {},
            create: {
                id: `award-${i + 1}`,
                sectionId: awardsSection.id,
                title: item.title,
                subtitle: item.subtitle,
                order: i + 1,
            },
        });
    }

    await prisma.section.upsert({
        where: { id: "home-cta" },
        update: {},
        create: {
            id: "home-cta",
            pageId: homePage.id,
            type: "cta",
            heading: "Siap Transformasi HR Perusahaan Anda?",
            subheading: "Jadwalkan demo gratis dan lihat bagaimana Present dapat membantu bisnis Anda.",
            ctaPrimaryLabel: "Jadwalkan Demo Gratis",
            ctaPrimaryHref: "/contact",
            order: 7,
        },
    });

    await prisma.page.upsert({
        where: { slug: "features" },
        update: {},
        create: {
            slug: "features",
            title: "Fitur Present HRIS",
        },
    });

    await prisma.page.upsert({
        where: { slug: "contact" },
        update: {},
        create: {
            slug: "contact",
            title: "Hubungi Kami",
        },
    });

    const leads = [
        {
            fullName: "John Doe",
            email: "john@company.com",
            phone: "081234567890",
            company: "PT ABC Indonesia",
            employees: "100-500",
            interest: "HRIS Core",
            message: "Kami tertarik untuk demo produk Present HRIS.",
            consent: true,
        },
        {
            fullName: "Jane Smith",
            email: "jane@startup.id",
            phone: "081298765432",
            company: "Startup XYZ",
            employees: "10-50",
            interest: "Payroll",
            message: "Butuh solusi payroll untuk tim kami.",
            consent: true,
        },
        {
            fullName: "Ahmad Rizki",
            email: "ahmad@enterprise.co.id",
            phone: "081355544433",
            company: "Enterprise Corp",
            employees: "500+",
            interest: "Full Suite",
            message: "Ingin integrasi dengan sistem existing kami.",
            consent: true,
        },
    ];

    for (const lead of leads) {
        await prisma.lead.create({
            data: lead,
        });
    }

    // Seed Products
    const products = [
        {
            id: "hris-core",
            name: "Present HRIS Core",
            slug: "hris-core",
            description: "Kelola data karyawan, struktur organisasi, dan dokumen HR dalam satu platform terintegrasi.",
            icon: "Users",
            features: "Data Karyawan, Struktur Organisasi, Dokumen HR, Employee Self Service",
            order: 1,
        },
        {
            id: "attendance",
            name: "Attendance",
            slug: "attendance",
            description: "Sistem absensi canggih dengan face recognition, geolocation, dan integrasi mesin fingerprint.",
            icon: "Clock",
            features: "Face Recognition, Geolocation, Fingerprint, Shift Management",
            order: 2,
        },
        {
            id: "payroll",
            name: "Payroll",
            slug: "payroll",
            description: "Penggajian otomatis dengan perhitungan PPh21, BPJS, dan komponen salary lainnya.",
            icon: "DollarSign",
            features: "PPh21 Calculator, BPJS, Slip Gaji Digital, Bank Transfer",
            order: 3,
        },
        {
            id: "performance",
            name: "Performance",
            slug: "performance",
            description: "Kelola KPI, OKR, dan performance review dengan dashboard analytics yang powerful.",
            icon: "TrendingUp",
            features: "KPI Management, OKR Tracking, 360 Feedback, Analytics Dashboard",
            order: 4,
        },
        {
            id: "recruitment",
            name: "Recruitment",
            slug: "recruitment",
            description: "Dari job posting hingga onboarding, kelola proses rekrutmen dengan mudah.",
            icon: "UserPlus",
            features: "Job Posting, Applicant Tracking, Interview Scheduling, Onboarding",
            order: 5,
        },
        {
            id: "mobile-app",
            name: "Mobile HR App",
            slug: "mobile-app",
            description: "Akses HR di mana saja dengan aplikasi mobile untuk iOS dan Android.",
            icon: "Smartphone",
            features: "iOS & Android, Push Notifications, Offline Mode, Biometric Login",
            order: 6,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product,
        });
    }

    console.log("Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
