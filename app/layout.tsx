import { PWAInstallPrompt } from "@/components/pwa-install";
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mental Math",
  },
  title: "Speed Maths Mastery â€“ Powered by Rahul Sir Classes",
  description: "Train students in fast speed calculation, percentage handling, and real-world math agility",
  icons: {
    icon: [
      { url: "/favicon-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon-logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-logo.png",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-logo.png" />
        <link rel="shortcut icon" href="/favicon-logo.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
        <PWAInstallPrompt appName="Mental Math" themeGradient="from-emerald-500 to-teal-600" />
      </body>
    </html>
  )
}

