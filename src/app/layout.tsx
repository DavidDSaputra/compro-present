import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Present - Solusi HRIS Terdepan Indonesia",
  description: "Platform HRIS terintegrasi untuk mengelola karyawan, absensi, penggajian, dan performa dalam satu sistem yang powerful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

