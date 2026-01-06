"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    createSection,
    updateSection,
    deleteSection,
    reorderSection,
} from "@/actions/sections";
import {
    Plus,
    Pencil,
    Trash2,
    ChevronUp,
    ChevronDown,
    ArrowLeft,
    List,
    Loader2,
} from "lucide-react";
import { useToast, ToastProvider } from "@/components/ui/toast";

interface Section {
    id: string;
    type: string;
    heading: string | null;
    subheading: string | null;
    ctaPrimaryLabel: string | null;
    ctaPrimaryHref: string | null;
    ctaSecondaryLabel: string | null;
    ctaSecondaryHref: string | null;
    imageUrl: string | null;
    order: number;
    _count: {
        items: number;
    };
}

interface Page {
    id: string;
    slug: string;
    title: string;
}

interface SectionsClientProps {
    page: Page;
    initialSections: Section[];
}

const sectionTypes = [
    { value: "hero", label: "Hero" },
    { value: "logo-cloud", label: "Logo Cloud" },
    { value: "features", label: "Features" },
    { value: "stats", label: "Stats" },
    { value: "testimonials", label: "Testimonials" },
    { value: "awards", label: "Awards" },
    { value: "cta", label: "CTA" },
];

export default function SectionsClient({ page, initialSections }: SectionsClientProps) {
    return (
        <ToastProvider>
            <SectionsContent page={page} initialSections={initialSections} />
        </ToastProvider>
    );
}

function SectionsContent({ page, initialSections }: SectionsClientProps) {
    const [sections] = useState(initialSections);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editSection, setEditSection] = useState<Section | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "hero",
        heading: "",
        subheading: "",
        ctaPrimaryLabel: "",
        ctaPrimaryHref: "",
        ctaSecondaryLabel: "",
        ctaSecondaryHref: "",
        imageUrl: "",
    });
    const { addToast } = useToast();

    const openCreateDialog = () => {
        setEditSection(null);
        setFormData({
            type: "hero",
            heading: "",
            subheading: "",
            ctaPrimaryLabel: "",
            ctaPrimaryHref: "",
            ctaSecondaryLabel: "",
            ctaSecondaryHref: "",
            imageUrl: "",
        });
        setIsDialogOpen(true);
    };

    const openEditDialog = (section: Section) => {
        setEditSection(section);
        setFormData({
            type: section.type,
            heading: section.heading || "",
            subheading: section.subheading || "",
            ctaPrimaryLabel: section.ctaPrimaryLabel || "",
            ctaPrimaryHref: section.ctaPrimaryHref || "",
            ctaSecondaryLabel: section.ctaSecondaryLabel || "",
            ctaSecondaryHref: section.ctaSecondaryHref || "",
            imageUrl: section.imageUrl || "",
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!formData.type) {
            addToast("Tipe wajib diisi", "error");
            return;
        }

        setIsLoading(true);
        try {
            if (editSection) {
                await updateSection(editSection.id, formData);
                addToast("Section berhasil diupdate", "success");
            } else {
                await createSection(page.id, formData);
                addToast("Section berhasil ditambahkan", "success");
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
        if (!confirm("Apakah Anda yakin ingin menghapus section ini?")) return;

        setIsLoading(true);
        try {
            await deleteSection(id);
            addToast("Section berhasil dihapus", "success");
            window.location.reload();
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReorder = async (id: string, direction: "up" | "down") => {
        await reorderSection(id, direction);
        window.location.reload();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#0F172A]">
                            Sections: {page.title}
                        </h1>
                        <p className="text-[#475569]">Kelola sections halaman /{page.slug}</p>
                    </div>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Section
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Sections</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Heading</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sections.map((section, index) => (
                                <TableRow key={section.id}>
                                    <TableCell>
                                        <Badge>{section.type}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {section.heading || "-"}
                                    </TableCell>
                                    <TableCell>{section._count.items}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleReorder(section.id, "up")}
                                                disabled={index === 0}
                                            >
                                                <ChevronUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleReorder(section.id, "down")}
                                                disabled={index === sections.length - 1}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                            <Link href={`/admin/sections/${section.id}/items`}>
                                                <Button variant="ghost" size="sm">
                                                    <List className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditDialog(section)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(section.id)}
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
                <DialogContent onClose={() => setIsDialogOpen(false)} className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editSection ? "Edit Section" : "Tambah Section"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                        <Select
                            label="Tipe"
                            options={sectionTypes}
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        />
                        <Input
                            label="Heading"
                            value={formData.heading}
                            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                        />
                        <Textarea
                            label="Subheading"
                            value={formData.subheading}
                            onChange={(e) =>
                                setFormData({ ...formData, subheading: e.target.value })
                            }
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Primary CTA Label"
                                value={formData.ctaPrimaryLabel}
                                onChange={(e) =>
                                    setFormData({ ...formData, ctaPrimaryLabel: e.target.value })
                                }
                            />
                            <Input
                                label="Primary CTA Href"
                                value={formData.ctaPrimaryHref}
                                onChange={(e) =>
                                    setFormData({ ...formData, ctaPrimaryHref: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Secondary CTA Label"
                                value={formData.ctaSecondaryLabel}
                                onChange={(e) =>
                                    setFormData({ ...formData, ctaSecondaryLabel: e.target.value })
                                }
                            />
                            <Input
                                label="Secondary CTA Href"
                                value={formData.ctaSecondaryHref}
                                onChange={(e) =>
                                    setFormData({ ...formData, ctaSecondaryHref: e.target.value })
                                }
                            />
                        </div>
                        <Input
                            label="Image URL"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
