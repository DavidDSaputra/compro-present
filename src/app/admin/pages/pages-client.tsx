"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    DialogFooter,
} from "@/components/ui/dialog";
import { createPage, updatePage, deletePage } from "@/actions/pages";
import { Plus, Pencil, Trash2, Layers, Loader2 } from "lucide-react";
import { useToast, ToastProvider } from "@/components/ui/toast";

interface Page {
    id: string;
    slug: string;
    title: string;
    createdAt: Date;
    _count: {
        sections: number;
    };
}

interface PagesClientProps {
    initialPages: Page[];
}

export default function PagesClient({ initialPages }: PagesClientProps) {
    return (
        <ToastProvider>
            <PagesContent initialPages={initialPages} />
        </ToastProvider>
    );
}

function PagesContent({ initialPages }: PagesClientProps) {
    const [pages] = useState(initialPages);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editPage, setEditPage] = useState<Page | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ slug: "", title: "" });
    const { addToast } = useToast();

    const openCreateDialog = () => {
        setEditPage(null);
        setFormData({ slug: "", title: "" });
        setIsDialogOpen(true);
    };

    const openEditDialog = (page: Page) => {
        setEditPage(page);
        setFormData({ slug: page.slug, title: page.title });
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!formData.slug || !formData.title) {
            addToast("Slug dan judul wajib diisi", "error");
            return;
        }

        setIsLoading(true);
        try {
            if (editPage) {
                const result = await updatePage(editPage.id, formData);
                if (result.success) {
                    addToast("Halaman berhasil diupdate", "success");
                    setIsDialogOpen(false);
                    window.location.reload();
                } else {
                    addToast(result.message || "Terjadi kesalahan", "error");
                }
            } else {
                const result = await createPage(formData);
                if (result.success) {
                    addToast("Halaman berhasil ditambahkan", "success");
                    setIsDialogOpen(false);
                    window.location.reload();
                } else {
                    addToast(result.message || "Terjadi kesalahan", "error");
                }
            }
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus halaman ini?")) return;

        setIsLoading(true);
        try {
            await deletePage(id);
            addToast("Halaman berhasil dihapus", "success");
            window.location.reload();
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
                    <h1 className="text-2xl font-bold text-[#0F172A]">Manajemen Halaman</h1>
                    <p className="text-[#475569]">Kelola halaman website</p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Halaman
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Halaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Sections</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pages.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell className="font-medium">{page.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">/{page.slug}</Badge>
                                    </TableCell>
                                    <TableCell>{page._count.sections}</TableCell>
                                    <TableCell>
                                        {new Date(page.createdAt).toLocaleDateString("id-ID")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/pages/${page.slug}/sections`}>
                                                <Button variant="ghost" size="sm">
                                                    <Layers className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" onClick={() => openEditDialog(page)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(page.id)}
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
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent onClose={() => setIsDialogOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>{editPage ? "Edit Halaman" : "Tambah Halaman"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input
                            label="Judul"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Nama halaman"
                        />
                        <Input
                            label="Slug"
                            value={formData.slug}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                })
                            }
                            placeholder="slug-halaman"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
