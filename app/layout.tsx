import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
const githubRepoUrl = "https://github.com/wlh-Yj/humanizeAI.git"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "humanizeAI - Humanize AI Text & Bypass AI Detectors",
  description:
    "The fastest, most affordable, and least detectable AI humanizer, guaranteed to outperform any competitor. Humanize your AI-generated text instantly.",
  keywords: ["AI humanizer", "bypass AI detector", "undetectable AI", "humanize text", "GPTZero bypass"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "humanizeAI",
    title: "humanizeAI - Humanize AI Text & Bypass AI Detectors",
    description:
      "The fastest, most affordable, and least detectable AI humanizer, guaranteed to outperform any competitor. Humanize your AI-generated text instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "humanizeAI social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "humanizeAI - Humanize AI Text & Bypass AI Detectors",
    description:
      "The fastest, most affordable, and least detectable AI humanizer, guaranteed to outperform any competitor. Humanize your AI-generated text instantly.",
    images: ["/og-image.png"],
  },
  other: {
    "github:repo": githubRepoUrl,
  },
}

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
