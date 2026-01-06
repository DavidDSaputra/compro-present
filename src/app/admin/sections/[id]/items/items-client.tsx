"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    createSectionItem,
    updateSectionItem,
    deleteSectionItem,
    reorderSectionItem,
} from "@/actions/items";
import {
    Plus,
    Pencil,
    Trash2,
    ChevronUp,
    ChevronDown,
    ArrowLeft,
    Loader2,
} from "lucide-react";
import { useToast, ToastProvider } from "@/components/ui/toast";

interface SectionItem {
    id: string;
    title: string | null;
    subtitle: string | null;
    imageUrl: string | null;
    href: string | null;
    tag: string | null;
    order: number;
}

interface Section {
    id: string;
    type: string;
    heading: string | null;
    page: {
        slug: string;
        title: string;
    };
}

interface ItemsClientProps {
    section: Section;
    initialItems: SectionItem[];
}

export default function ItemsClient({ section, initialItems }: ItemsClientProps) {
    return (
        <ToastProvider>
            <ItemsContent section={section} initialItems={initialItems} />
        </ToastProvider>
    );
}

function ItemsContent({ section, initialItems }: ItemsClientProps) {
    const [items] = useState(initialItems);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState<SectionItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        imageUrl: "",
        href: "",
        tag: "",
    });
    const { addToast } = useToast();

    const openCreateDialog = () => {
        setEditItem(null);
        setFormData({ title: "", subtitle: "", imageUrl: "", href: "", tag: "" });
        setIsDialogOpen(true);
    };

    const openEditDialog = (item: SectionItem) => {
        setEditItem(item);
        setFormData({
            title: item.title || "",
            subtitle: item.subtitle || "",
            imageUrl: item.imageUrl || "",
            href: item.href || "",
            tag: item.tag || "",
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (editItem) {
                await updateSectionItem(editItem.id, formData);
                addToast("Item berhasil diupdate", "success");
            } else {
                await createSectionItem(section.id, formData);
                addToast("Item berhasil ditambahkan", "success");
            }
            setIsDialogOpen(false);
            window.location.reload();
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

        setIsLoading(true);
        try {
            await deleteSectionItem(id);
            addToast("Item berhasil dihapus", "success");
            window.location.reload();
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReorder = async (id: string, direction: "up" | "down") => {
        await reorderSectionItem(id, direction);
        window.location.reload();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/pages/${section.page.slug}/sections`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#0F172A]">
                            Items: {section.heading || section.type}
                        </h1>
                        <p className="text-[#475569]">
                            Section {section.type} di halaman {section.page.title}
                        </p>
                    </div>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Item
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Subtitle</TableHead>
                                <TableHead>Tag</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title || "-"}</TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {item.subtitle || "-"}
                                    </TableCell>
                                    <TableCell>{item.tag || "-"}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleReorder(item.id, "up")}
                                                disabled={index === 0}
                                            >
                                                <ChevronUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleReorder(item.id, "down")}
                                                disabled={index === items.length - 1}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditDialog(item)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(item.id)}
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
                        <DialogTitle>{editItem ? "Edit Item" : "Tambah Item"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <Textarea
                            label="Subtitle"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                        <Input
                            label="Image URL"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                        <Input
                            label="Link (href)"
                            value={formData.href}
                            onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                        />
                        <Input
                            label="Tag"
                            value={formData.tag}
                            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
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
