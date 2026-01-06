"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteLead, exportLeadsCSV } from "@/actions/leads";
import { Trash2, Eye, Download, Loader2 } from "lucide-react";
import { useToast, ToastProvider } from "@/components/ui/toast";

interface Lead {
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
}

interface LeadsClientProps {
    initialLeads: Lead[];
}

export default function LeadsClient({ initialLeads }: LeadsClientProps) {
    return (
        <ToastProvider>
            <LeadsContent initialLeads={initialLeads} />
        </ToastProvider>
    );
}

function LeadsContent({ initialLeads }: LeadsClientProps) {
    const [leads] = useState(initialLeads);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus lead ini?")) return;

        setIsLoading(true);
        try {
            await deleteLead(id);
            addToast("Lead berhasil dihapus", "success");
            window.location.reload();
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = async () => {
        setIsLoading(true);
        try {
            const csv = await exportLeadsCSV();
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            addToast("Export berhasil", "success");
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Leads</h1>
                    <p className="text-[#475569]">
                        Daftar leads dari form kontak ({leads.length} total)
                    </p>
                </div>
                <Button onClick={handleExport} disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <Download className="h-4 w-4 mr-2" />
                    )}
                    Export CSV
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    {leads.length === 0 ? (
                        <p className="text-center text-[#475569] py-8">Belum ada leads</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Perusahaan</TableHead>
                                    <TableHead>Minat</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell className="font-medium">{lead.fullName}</TableCell>
                                        <TableCell>{lead.email}</TableCell>
                                        <TableCell>{lead.company || "-"}</TableCell>
                                        <TableCell>
                                            {lead.interest ? (
                                                <Badge variant="secondary">{lead.interest}</Badge>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(lead.createdAt).toLocaleDateString("id-ID")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedLead(lead)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
                <DialogContent onClose={() => setSelectedLead(null)} className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Detail Lead</DialogTitle>
                    </DialogHeader>
                    {selectedLead && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[#475569]">Nama Lengkap</p>
                                    <p className="font-medium">{selectedLead.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#475569]">Email</p>
                                    <p className="font-medium">{selectedLead.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#475569]">Telepon</p>
                                    <p className="font-medium">{selectedLead.phone || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#475569]">Perusahaan</p>
                                    <p className="font-medium">{selectedLead.company || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#475569]">Jumlah Karyawan</p>
                                    <p className="font-medium">{selectedLead.employees || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#475569]">Minat</p>
                                    <p className="font-medium">{selectedLead.interest || "-"}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[#475569]">Pesan</p>
                                <p className="font-medium">{selectedLead.message || "-"}</p>
                            </div>
                            <div className="flex justify-between text-sm text-[#475569]">
                                <span>
                                    Consent: {selectedLead.consent ? "Ya" : "Tidak"}
                                </span>
                                <span>
                                    {new Date(selectedLead.createdAt).toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
