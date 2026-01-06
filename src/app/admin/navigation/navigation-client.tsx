"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
    createNavigationItem,
    updateNavigationItem,
    deleteNavigationItem,
    reorderNavigationItem,
} from "@/actions/navigation";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { useToast, ToastProvider } from "@/components/ui/toast";

interface NavItem {
    id: string;
    label: string;
    href: string | null;
    type: string;
    order: number;
    children?: NavItem[];
}

interface NavigationClientProps {
    initialItems: NavItem[];
}

export default function NavigationClient({ initialItems }: NavigationClientProps) {
    const [items, setItems] = useState(initialItems);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState<NavItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ label: "", href: "", type: "link" });

    return (
        <ToastProvider>
            <NavigationContent
                items={items}
                setItems={setItems}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                editItem={editItem}
                setEditItem={setEditItem}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                formData={formData}
                setFormData={setFormData}
            />
        </ToastProvider>
    );
}

function NavigationContent({
    items,
    isDialogOpen,
    setIsDialogOpen,
    editItem,
    setEditItem,
    isLoading,
    setIsLoading,
    formData,
    setFormData,
}: {
    items: NavItem[];
    setItems: (items: NavItem[]) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    editItem: NavItem | null;
    setEditItem: (item: NavItem | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    formData: { label: string; href: string; type: string };
    setFormData: (data: { label: string; href: string; type: string }) => void;
}) {
    const { addToast } = useToast();

    const typeOptions = [
        { value: "link", label: "Link" },
        { value: "dropdown", label: "Dropdown" },
        { value: "mega", label: "Mega Menu" },
        { value: "cta", label: "CTA Button" },
    ];

    const openCreateDialog = () => {
        setEditItem(null);
        setFormData({ label: "", href: "", type: "link" });
        setIsDialogOpen(true);
    };

    const openEditDialog = (item: NavItem) => {
        setEditItem(item);
        setFormData({ label: item.label, href: item.href || "", type: item.type });
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!formData.label) {
            addToast("Label wajib diisi", "error");
            return;
        }

        setIsLoading(true);
        try {
            if (editItem) {
                await updateNavigationItem(editItem.id, formData);
                addToast("Item berhasil diupdate", "success");
            } else {
                await createNavigationItem(formData);
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
            await deleteNavigationItem(id);
            addToast("Item berhasil dihapus", "success");
            window.location.reload();
        } catch {
            addToast("Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReorder = async (id: string, direction: "up" | "down") => {
        await reorderNavigationItem(id, direction);
        window.location.reload();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Manajemen Navigasi</h1>
                    <p className="text-[#475569]">Kelola menu navigasi website</p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Menu
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Menu Utama</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Label</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Submenu</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.label}</TableCell>
                                    <TableCell>{item.href || "-"}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.type === "cta" ? "default" : "secondary"}>
                                            {item.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.children?.length || 0}</TableCell>
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
                                            <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
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
                        <DialogTitle>{editItem ? "Edit Menu" : "Tambah Menu"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input
                            label="Label"
                            value={formData.label}
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            placeholder="Nama menu"
                        />
                        <Input
                            label="URL"
                            value={formData.href}
                            onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                            placeholder="/halaman"
                        />
                        <Select
                            label="Tipe"
                            options={typeOptions}
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
