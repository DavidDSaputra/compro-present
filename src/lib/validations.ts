import { z } from "zod";

export const contactFormSchema = z.object({
    fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    phone: z.string().min(10, "Nomor telepon minimal 10 digit").optional().or(z.literal("")),
    company: z.string().optional(),
    employees: z.string().optional(),
    interest: z.string().optional(),
    message: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, "Anda harus menyetujui kebijakan privasi"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const pageSchema = z.object({
    slug: z.string().min(1, "Slug wajib diisi").regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan dash"),
    title: z.string().min(1, "Judul wajib diisi"),
});

export const sectionSchema = z.object({
    type: z.string().min(1, "Tipe wajib diisi"),
    heading: z.string().optional(),
    subheading: z.string().optional(),
    ctaPrimaryLabel: z.string().optional(),
    ctaPrimaryHref: z.string().optional(),
    ctaSecondaryLabel: z.string().optional(),
    ctaSecondaryHref: z.string().optional(),
    imageUrl: z.string().optional(),
});

export const sectionItemSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    imageUrl: z.string().optional(),
    href: z.string().optional(),
    tag: z.string().optional(),
});

export const navigationItemSchema = z.object({
    label: z.string().min(1, "Label wajib diisi"),
    href: z.string().optional(),
    type: z.enum(["link", "dropdown", "mega", "cta"]),
});

export const siteSettingSchema = z.object({
    companyName: z.string().min(1, "Nama perusahaan wajib diisi"),
    logoUrl: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email("Email tidak valid").optional().or(z.literal("")),
    whatsappLink: z.string().optional(),
    mapEmbedHtml: z.string().optional(),
});
