import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { RootLayers } from "@/components/ui/RootLayers";
import { NavigationMenu } from "@/components/ui/NavigationMenu";
import { PageTransitionOverlay } from "@/components/ui/PageTransitionOverlay";
import { MascotAssistant } from "@/components/ui/MascotAssistant";
import { JourneySpotlight } from "@/components/ui/JourneySpotlight";
// Client-component wrapper that lazy-loads NewStampCelebration with ssr:false
import { NewStampCelebrationLoader } from "@/components/ui/NewStampCelebrationLoader";
import { CustomCursorLoader } from "@/components/ui/CustomCursorLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NusaPlay — Jelajahi Warisan Budaya Nusantara",
    template: "%s | NusaPlay",
  },
  description:
    "Platform eksplorasi interaktif 3D untuk mengenal kekayaan budaya Nusantara — tari, musik, kuliner, dan lebih dari 38 provinsi Indonesia.",
  keywords: ["budaya Indonesia", "warisan budaya", "nusantara", "tari tradisional", "musik daerah", "NusaPlay"],
  authors: [{ name: "NusaPlay Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nusaplay.vercel.app"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "NusaPlay",
    title: "NusaPlay — Jelajahi Warisan Budaya Nusantara",
    description: "Jelajahi kekayaan budaya Indonesia melalui pengalaman interaktif 3D. Dari Sabang sampai Merauke.",
    images: [{ url: "/img/menu_about.webp", width: 800, height: 600, alt: "NusaPlay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NusaPlay — Jelajahi Warisan Budaya Nusantara",
    description: "Platform eksplorasi interaktif budaya Nusantara.",
    images: ["/img/menu_about.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0D1B2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        {/* ── Preconnect to third-party origins used at runtime ───────────── */}
        {/* Leaflet map tiles (MapView) */}
        <link rel="preconnect" href="https://basemaps.cartocdn.com" />
        {/* DNS-prefetch as fallback for older browsers */}
        <link rel="dns-prefetch" href="https://basemaps.cartocdn.com" />
        {/* Prefetch self-hosted Leaflet ONLY after user starts journey (handled in RootLayers) */}
        {/* Prefetch hints removed — they caused double-downloads with the on-demand loaders */}
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <RootLayers />
          <CustomCursorLoader />
          <JourneySpotlight />
          <NewStampCelebrationLoader />
          {children}
          <NavigationMenu />
          <PageTransitionOverlay />
          <MascotAssistant />
        </Providers>
      </body>
    </html>
  );
}
