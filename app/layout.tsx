import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

export const metadata: Metadata = {
  title: "Brief Form",
};
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/app-header";
import { AuthGuard, AuthProvider } from "@/components/auth-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <AppHeader />
            <AuthGuard>{children}</AuthGuard>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
