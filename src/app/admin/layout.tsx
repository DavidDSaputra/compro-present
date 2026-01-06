import { AdminSidebar } from "@/components/admin-sidebar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin - Present",
    description: "Admin panel untuk mengelola konten website Present",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="min-h-screen bg-[#F8FAFC] flex">
                <AdminSidebar />
                <main className="flex-1 lg:ml-0">
                    <div className="p-4 lg:p-8">{children}</div>
                </main>
            </div>
        </SessionProvider>
    );
}
