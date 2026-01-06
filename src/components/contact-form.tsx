"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const employeeOptions = [
    { value: "1-10", label: "1-10 karyawan" },
    { value: "11-50", label: "11-50 karyawan" },
    { value: "51-100", label: "51-100 karyawan" },
    { value: "101-500", label: "101-500 karyawan" },
    { value: "500+", label: "500+ karyawan" },
];

const interestOptions = [
    { value: "HRIS Core", label: "HRIS Core" },
    { value: "Attendance", label: "Attendance" },
    { value: "Payroll", label: "Payroll" },
    { value: "Performance", label: "Performance" },
    { value: "Recruitment", label: "Recruitment" },
    { value: "Full Suite", label: "Full Suite" },
];

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            consent: false,
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const result = await submitContactForm(data);
            if (result.success) {
                addToast(result.message, "success");
                reset();
            } else {
                addToast(result.message, "error");
            }
        } catch {
            addToast("Terjadi kesalahan. Silakan coba lagi.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Nama Lengkap *"
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                />
                <Input
                    label="Email *"
                    type="email"
                    placeholder="john@company.com"
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Nomor Telepon"
                    placeholder="08123456789"
                    error={errors.phone?.message}
                    {...register("phone")}
                />
                <Input
                    label="Nama Perusahaan"
                    placeholder="PT Maju Bersama"
                    {...register("company")}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Jumlah Karyawan"
                    options={employeeOptions}
                    {...register("employees")}
                />
                <Select
                    label="Produk yang Diminati"
                    options={interestOptions}
                    {...register("interest")}
                />
            </div>

            <Textarea
                label="Pesan"
                placeholder="Ceritakan kebutuhan HR perusahaan Anda..."
                rows={4}
                {...register("message")}
            />

            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 rounded border-[#E2E8F0] text-[#1E40AF] focus:ring-[#1E40AF]"
                    {...register("consent")}
                />
                <label htmlFor="consent" className="text-sm text-[#475569]">
                    Saya setuju untuk menerima komunikasi dari Present dan memahami bahwa data saya akan diproses sesuai dengan Kebijakan Privasi.
                </label>
            </div>
            {errors.consent && (
                <p className="text-sm text-red-500 -mt-4">{errors.consent.message}</p>
            )}

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                    </>
                ) : (
                    "Kirim Pesan"
                )}
            </Button>
        </form>
    );
}
