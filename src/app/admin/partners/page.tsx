"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Handshake, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Partner {
    id: string;
    name: string;
    logoUrl: string | null;
    logoType: string;
    websiteUrl: string | null;
    description: string | null;
    isActive: boolean;
    order: number;
}

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPartners();
    }, []);

    async function fetchPartners() {
        try {
            const res = await fetch("/api/partners");
            const data = await res.json();
            setPartners(data);
        } catch (error) {
            console.error("Failed to fetch partners:", error);
        } finally {
            setLoading(false);
        }
    }

    async function deletePartner(id: string) {
        if (!confirm("Apakah Anda yakin ingin menghapus mitra ini?")) return;

        try {
            await fetch(`/api/partners/${id}`, { method: "DELETE" });
            setPartners(partners.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Failed to delete partner:", error);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mitra Kami</h1>
                    <p className="text-gray-500 mt-1">Kelola logo mitra/partner yang ditampilkan di website</p>
                </div>
                <Link href="/admin/partners/new">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Mitra
                    </Button>
                </Link>
            </div>

            {partners.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                    <Handshake className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada mitra</h3>
                    <p className="text-gray-500 mb-6">Mulai dengan menambahkan mitra pertama Anda</p>
                    <Link href="/admin/partners/new">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Mitra
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Mitra</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe Upload</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="text-right py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {partners.map((partner) => (
                                <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                                <Handshake className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{partner.name}</p>
                                                {partner.websiteUrl && (
                                                    <a
                                                        href={partner.websiteUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                                    >
                                                        Website <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {partner.logoUrl ? (
                                            <div className="w-24 h-12 bg-gray-50 rounded border border-gray-200 flex items-center justify-center p-1">
                                                <Image
                                                    src={partner.logoUrl}
                                                    alt={partner.name}
                                                    width={80}
                                                    height={40}
                                                    className="object-contain max-h-10"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm">No logo</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${partner.logoType === "file"
                                                ? "bg-purple-100 text-purple-800"
                                                : "bg-blue-100 text-blue-800"
                                            }`}>
                                            {partner.logoType === "file" ? "File Upload" : "Link URL"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${partner.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                            }`}>
                                            {partner.isActive ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-500">{partner.order}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/partners/${partner.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deletePartner(partner.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
