"use client";

import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Upload, Link2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

export default function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploadType, setUploadType] = useState<"link" | "file">("link");
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        logoUrl: "",
        logoType: "link",
        websiteUrl: "",
        description: "",
        isActive: true,
        order: 0,
    });

    useEffect(() => {
        fetchPartner();
    }, [id]);

    async function fetchPartner() {
        try {
            const res = await fetch(`/api/partners/${id}`);
            if (res.ok) {
                const data: Partner = await res.json();
                setFormData({
                    name: data.name,
                    logoUrl: data.logoUrl || "",
                    logoType: data.logoType,
                    websiteUrl: data.websiteUrl || "",
                    description: data.description || "",
                    isActive: data.isActive,
                    order: data.order,
                });
                setUploadType(data.logoType as "link" | "file");
                setPreviewUrl(data.logoUrl || "");
            } else {
                alert("Mitra tidak ditemukan");
                router.push("/admin/partners");
            }
        } catch (error) {
            console.error("Failed to fetch partner:", error);
        } finally {
            setFetching(false);
        }
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Show preview first
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Upload file
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData,
            });

            if (res.ok) {
                const data = await res.json();
                setFormData({
                    ...formData,
                    logoUrl: data.url,
                    logoType: "file",
                });
            } else {
                const error = await res.json();
                alert(error.error || "Gagal upload file");
                setPreviewUrl(formData.logoUrl);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Gagal upload file");
            setPreviewUrl(formData.logoUrl);
        } finally {
            setUploading(false);
        }
    }

    function handleLinkChange(url: string) {
        setFormData({
            ...formData,
            logoUrl: url,
            logoType: "link",
        });
        setPreviewUrl(url);
    }

    function clearLogo() {
        setFormData({
            ...formData,
            logoUrl: "",
            logoType: uploadType,
        });
        setPreviewUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/partners/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    logoType: uploadType,
                }),
            });

            if (res.ok) {
                router.push("/admin/partners");
            } else {
                alert("Gagal menyimpan mitra");
            }
        } catch (error) {
            console.error("Failed to update partner:", error);
            alert("Gagal menyimpan mitra");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/partners">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Mitra</h1>
                    <p className="text-gray-500 mt-1">Ubah informasi mitra</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Mitra *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Contoh: Bank Mandiri"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input
                            id="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                            placeholder="https://www.example.com"
                        />
                    </div>

                    {/* Logo Upload Section */}
                    <div className="md:col-span-2 space-y-4">
                        <Label>Logo Mitra</Label>

                        {/* Upload Type Selector */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setUploadType("link");
                                    if (formData.logoType !== "link") {
                                        clearLogo();
                                    }
                                }}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${uploadType === "link"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <Link2 className="h-5 w-5" />
                                <div className="text-left">
                                    <p className="font-medium">By Link URL</p>
                                    <p className="text-xs text-gray-500">Masukkan URL gambar</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setUploadType("file");
                                    if (formData.logoType !== "file") {
                                        clearLogo();
                                    }
                                }}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${uploadType === "file"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <Upload className="h-5 w-5" />
                                <div className="text-left">
                                    <p className="font-medium">Upload File</p>
                                    <p className="text-xs text-gray-500">Upload dari komputer</p>
                                </div>
                            </button>
                        </div>

                        {/* Link Input */}
                        {uploadType === "link" && (
                            <div className="space-y-2">
                                <Input
                                    value={formData.logoUrl}
                                    onChange={(e) => handleLinkChange(e.target.value)}
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>
                        )}

                        {/* File Upload */}
                        {uploadType === "file" && (
                            <div className="space-y-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />

                                {!formData.logoUrl ? (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                    >
                                        {uploading ? (
                                            <div className="flex flex-col items-center text-gray-500">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                                                <p>Mengupload...</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-500">
                                                <Upload className="h-10 w-10 mb-2" />
                                                <p className="font-medium">Klik untuk upload</p>
                                                <p className="text-sm">atau drag & drop file di sini</p>
                                                <p className="text-xs text-gray-400 mt-2">JPEG, PNG, GIF, WebP, SVG (Max 5MB)</p>
                                            </div>
                                        )}
                                    </button>
                                ) : (
                                    <div className="relative">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-2 right-16 bg-white shadow-sm"
                                        >
                                            <Upload className="h-4 w-4 mr-1" />
                                            Ganti
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Preview */}
                        {previewUrl && (
                            <div className="relative inline-block">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 inline-flex items-center">
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        width={200}
                                        height={100}
                                        className="object-contain max-h-24"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={clearLogo}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Deskripsi singkat tentang mitra (opsional)..."
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order">Urutan</Label>
                        <Input
                            id="order"
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="isActive">Aktif</Label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                    <Link href="/admin/partners">
                        <Button variant="outline" type="button">Batal</Button>
                    </Link>
                    <Button type="submit" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
