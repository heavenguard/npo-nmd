import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NMD ASSOCIATION - Nanosatellite Missions Design",
  description:
    "Promoting the development of technically competent African professionals in space sciences and technologies through practical satellite missions and hands-on learning opportunities.",
  icons: {
    icon: "/assets/logoWhiteOnBlue.png", // path in your public folder
    shortcut: "/assets/logoWhiteOnBlue.png",
    apple: "/assets/logoWhiteOnBlue.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}