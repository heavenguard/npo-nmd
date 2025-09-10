import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NMD ASSOCIATION - Nanosatellite Missions Design",
  description:
    "Promoting the development of technically competent African professionals in space sciences and technologies through practical satellite missions and hands-on learning opportunities.",
  icons: {
    icon: "/assets/logoWhiteOnBlue.png",
    shortcut: "/assets/logoWhiteOnBlue.png",
    apple: "/assets/logoWhiteOnBlue.png",
  },
  openGraph: {
    title: "NMD ASSOCIATION - Nanosatellite Missions Design",
    description:
      "Promoting the development of technically competent African professionals in space sciences and technologies through practical satellite missions and hands-on learning opportunities.",
    url: "https://npo.nanosatellitemissions.com",
    siteName: "NMD Association",
    images: [
      {
        url: "/assets/logoWhiteOnBlue.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/assets/logoWhiteOnBlue.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NextIntlClientProvider>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
