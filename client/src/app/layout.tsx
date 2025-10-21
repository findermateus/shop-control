import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/providers/LoadingProvider";
import {getStoreDescription, getStoreName} from "@/lib/client-utils";
import { ThemeToggleButton } from "@/components/global/theme-toggle-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: getStoreName(),
  description: getStoreDescription(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          {children}
          <Toaster />
          <ThemeToggleButton />
        </LoadingProvider>
      </body>
    </html>
  );
}
