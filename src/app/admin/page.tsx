import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Users, UserPlus, Calendar } from "lucide-react";

async function getLeadStats() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [total, today, thisWeek] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({
            where: { createdAt: { gte: startOfDay } },
        }),
        prisma.lead.count({
            where: { createdAt: { gte: startOfWeek } },
        }),
    ]);

    return { total, today, thisWeek };
}

async function getRecentLeads() {
    return prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminDashboard() {
    const [stats, recentLeads] = await Promise.all([getLeadStats(), getRecentLeads()]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
                <p className="text-[#475569]">Selamat datang di Admin Panel Present</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#475569]">
                            Total Leads
                        </CardTitle>
                        <Users className="h-5 w-5 text-[#1E40AF]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0F172A]">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#475569]">
                            Leads Hari Ini
                        </CardTitle>
                        <UserPlus className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0F172A]">{stats.today}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-[#475569]">
                            Leads Minggu Ini
                        </CardTitle>
                        <Calendar className="h-5 w-5 text-[#38BDF8]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0F172A]">{stats.thisWeek}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Leads Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentLeads.length === 0 ? (
                        <p className="text-[#475569] text-center py-8">Belum ada leads</p>
                    ) : (
                        <div className="space-y-4">
                            {recentLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                                >
                                    <div>
                                        <p className="font-medium text-[#0F172A]">{lead.fullName}</p>
                                        <p className="text-sm text-[#475569]">{lead.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-[#475569]">{lead.company}</p>
                                        <p className="text-xs text-[#94A3B8]">
                                            {new Date(lead.createdAt).toLocaleDateString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
