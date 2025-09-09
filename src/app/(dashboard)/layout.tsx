import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/auth-context";
import ProtectedRoute from "@/components/protected-route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NMD ASSOCIATION - Nanosatellite Missions Design",
  description:
    "Promoting the development of technically competent African professionals in space sciences and technologies through practical satellite missions and hands-on learning opportunities.",
  icons: {
    icon: "/assets/logoWhiteOnBlue.png", // path in your public folder
    shortcut: "/assets/logoWhiteOnBlue.png",
    apple: "/assets/logoWhiteOnBlue.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
