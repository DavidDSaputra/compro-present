"use server";

import prisma from "@/lib/prisma";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export async function submitContactForm(data: ContactFormData) {
    try {
        const validated = contactFormSchema.parse(data);

        await prisma.lead.create({
            data: {
                fullName: validated.fullName,
                email: validated.email,
                phone: validated.phone || null,
                company: validated.company || null,
                employees: validated.employees || null,
                interest: validated.interest || null,
                message: validated.message || null,
                consent: validated.consent,
            },
        });

        return { success: true, message: "Terima kasih! Kami akan segera menghubungi Anda." };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, message: "Terjadi kesalahan. Silakan coba lagi." };
    }
}
