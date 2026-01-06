"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLeads() {
    return prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteLead(id: string) {
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin/leads");
    return { success: true };
}

export async function exportLeadsCSV() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
    });

    const headers = [
        "ID",
        "Nama Lengkap",
        "Email",
        "Telepon",
        "Perusahaan",
        "Jumlah Karyawan",
        "Minat",
        "Pesan",
        "Consent",
        "Tanggal",
    ];

    const rows: string[][] = leads.map((lead: {
        id: string;
        fullName: string;
        email: string;
        phone: string | null;
        company: string | null;
        employees: string | null;
        interest: string | null;
        message: string | null;
        consent: boolean;
        createdAt: Date;
    }) => [
            lead.id,
            lead.fullName,
            lead.email,
            lead.phone || "",
            lead.company || "",
            lead.employees || "",
            lead.interest || "",
            (lead.message || "").replace(/"/g, '""'),
            lead.consent ? "Ya" : "Tidak",
            new Date(lead.createdAt).toLocaleString("id-ID"),
        ]);

    const csv = [
        headers.join(","),
        ...rows.map((row: string[]) => row.map((cell: string) => `"${cell}"`).join(",")),
    ].join("\n");

    return csv;
}
